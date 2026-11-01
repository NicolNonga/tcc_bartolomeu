import AlertaRepository from '#repositories/alerta_repository'
import NotificacaoRepository from '#repositories/notificacao_repository'
import GestorFrotaRepository from '#repositories/gestor_frota_repository'
import { SendEmail } from '#services/email/send_email'
import type DocumentoViatura from '#models/documento_viatura'
import type Condutor from '#models/condutor'
import type ManutencaoAgendamento from '#models/manutencao_agendamento'
import type User from '#models/user'
import Abastecimento from '#models/abastecimento'
import { DateTime } from 'luxon'

type ResultadoGeracao = {
  criadas: number
  documentos: number
  cartas: number
  agendamentos: number
  anomalias_combustivel: number
  emails_enviados: number
}

export default class GerarNotificacoesVencimentoService {
  constructor(
    private alertaRepository = new AlertaRepository(),
    private notificacaoRepository = new NotificacaoRepository(),
    private gestorFrotaRepository = new GestorFrotaRepository(),
    private emailService = new SendEmail()
  ) {}

  async execute(dias = 30): Promise<ResultadoGeracao> {
    const gestores = await this.gestorFrotaRepository.listarGestores()
    const { documentos, cartas, agendamentos } = await this.alertaRepository.todos(dias)

    let criadas = 0
    let emailsEnviados = 0

    for (const documento of documentos) {
      const resultado = await this.notificarDocumento(documento, gestores)
      criadas += resultado.criadas
      emailsEnviados += resultado.emails
    }

    for (const condutor of cartas) {
      const resultado = await this.notificarCarta(condutor, gestores)
      criadas += resultado.criadas
      emailsEnviados += resultado.emails
    }

    for (const agendamento of agendamentos) {
      const resultado = await this.notificarManutencao(agendamento, gestores)
      criadas += resultado.criadas
      emailsEnviados += resultado.emails
    }

    const anomalias = await this.detectarAnomaliasCombustivel(dias)
    for (const anomalia of anomalias) {
      const resultado = await this.criarNotificacoes({
        destinatarios: gestores,
        tipo: 'consumo_anomalo',
        entidade: 'abastecimento',
        entidadeId: anomalia.abastecimentoId,
        titulo: 'Consumo de combustível anómalo',
        mensagem: `Viatura ${anomalia.matricula}: ${anomalia.motivo}.`,
      })
      criadas += resultado.criadas
      emailsEnviados += resultado.emails
    }

    return {
      criadas,
      anomalias_combustivel: anomalias.length,
      documentos: documentos.length,
      cartas: cartas.length,
      agendamentos: agendamentos.length,
      emails_enviados: emailsEnviados,
    }
  }

  /**
   * Consumo "atestado a atestado" por viatura (km desde o abastecimento anterior ÷ litros).
   * Mesma regra do front-end: desvio > 30% face à média da viatura, consumo implausível
   * ou quilometragem que não avança. Só devolve anomalias dos últimos `dias` dias.
   */
  private async detectarAnomaliasCombustivel(dias: number) {
    const limite = DateTime.now().minus({ days: dias }).startOf('day')
    const todos = await Abastecimento.query().preload('viatura').orderBy('data_abastecimento', 'asc')

    const porViatura = new Map<number, Abastecimento[]>()
    for (const a of todos) {
      porViatura.set(a.viaturaId, [...(porViatura.get(a.viaturaId) ?? []), a])
    }

    const anomalias: { abastecimentoId: number; matricula: string; motivo: string }[] = []

    for (const lista of porViatura.values()) {
      lista.sort(
        (a, b) =>
          a.dataAbastecimento.toMillis() - b.dataAbastecimento.toMillis() ||
          (a.quilometragemRegistrada ?? 0) - (b.quilometragemRegistrada ?? 0) ||
          a.id - b.id
      )
      let kmAnterior: number | null = null
      const calculados: { a: Abastecimento; consumo: number | null; regrediu: boolean }[] = []
      for (const a of lista) {
        const litros = Number(a.quantidadeLitros)
        const km = a.quilometragemRegistrada
        let consumo: number | null = null
        let regrediu = false
        if (km != null && km > 0) {
          if (kmAnterior != null) {
            if (km <= kmAnterior) regrediu = true
            else if (litros > 0) consumo = (km - kmAnterior) / litros
          }
          kmAnterior = km
        }
        calculados.push({ a, consumo, regrediu })
      }

      const validos = calculados.filter((c) => c.consumo != null).map((c) => c.consumo as number)
      const media = validos.length ? validos.reduce((x, y) => x + y, 0) / validos.length : null

      for (const c of calculados) {
        if (c.a.dataAbastecimento < limite) continue
        let motivo: string | null = null
        if (c.regrediu) {
          motivo = 'quilometragem inferior ou igual à do abastecimento anterior'
        } else if (c.consumo != null) {
          if (c.consumo < 1.5 || c.consumo > 40) {
            motivo = `consumo de ${c.consumo.toFixed(1)} km/L fora de valores plausíveis`
          } else if (media != null && validos.length > 1) {
            const desvio = Math.abs(c.consumo - media) / media
            if (desvio > 0.3) {
              motivo = `consumo de ${c.consumo.toFixed(1)} km/L, ${Math.round(desvio * 100)}% ${
                c.consumo < media ? 'abaixo' : 'acima'
              } da média da viatura`
            }
          }
        }
        if (motivo) {
          anomalias.push({
            abastecimentoId: c.a.id,
            matricula: c.a.viatura?.matricula ?? `#${c.a.viaturaId}`,
            motivo,
          })
        }
      }
    }
    return anomalias
  }

  private async notificarDocumento(documento: DocumentoViatura, gestores: User[]) {
    const viatura = documento.viatura
    const matricula = viatura?.matricula || `#${documento.viaturaId}`
    const validade = this.formatarData(documento.dataValidade)
    const titulo = `Documento a vencer: ${documento.tipoDocumento}`
    const mensagem = `O documento "${documento.tipoDocumento}" da viatura ${matricula} vence em ${validade}.`

    return this.criarNotificacoes({
      destinatarios: gestores,
      tipo: 'documento_vencimento',
      entidade: 'documento_viatura',
      entidadeId: documento.id,
      titulo,
      mensagem,
    })
  }

  private async notificarCarta(condutor: Condutor, gestores: User[]) {
    const nome = condutor.user?.fullName || `Condutor #${condutor.id}`
    const validade = this.formatarData(condutor.validadeCarta)
    const titulo = `Carta de condução a vencer`
    const mensagem = `A carta de condução (${condutor.numeroCarta}) de ${nome} vence em ${validade}.`

    const destinatarios = [...gestores]
    if (condutor.userId && !destinatarios.find((u) => u.id === condutor.userId)) {
      const condutorUser = condutor.user
      if (condutorUser) destinatarios.push(condutorUser as User)
    }

    return this.criarNotificacoes({
      destinatarios,
      tipo: 'carta_vencimento',
      entidade: 'condutor',
      entidadeId: condutor.id,
      titulo,
      mensagem,
    })
  }

  private async notificarManutencao(agendamento: ManutencaoAgendamento, gestores: User[]) {
    const viatura = agendamento.viatura
    const matricula = viatura?.matricula || `#${agendamento.viaturaId}`
    const titulo = `Manutenção preventiva pendente`
    const alvo =
      agendamento.tipoAgendamento === 'por_data'
        ? `data ${this.formatarData(agendamento.dataAlvo)}`
        : `${agendamento.quilometragemAlvo} km`

    const mensagem = `A manutenção "${agendamento.descricao}" da viatura ${matricula} está prevista para ${alvo}.`

    return this.criarNotificacoes({
      destinatarios: gestores,
      tipo: 'manutencao_agendada',
      entidade: 'manutencao_agendamento',
      entidadeId: agendamento.id,
      titulo,
      mensagem,
    })
  }

  private async criarNotificacoes(params: {
    destinatarios: User[]
    tipo: string
    entidade: string
    entidadeId: number
    titulo: string
    mensagem: string
  }) {
    let criadas = 0
    let emails = 0

    for (const destinatario of params.destinatarios) {
      const existe = await this.notificacaoRepository.existeRecente(
        destinatario.id,
        params.tipo,
        params.entidade,
        params.entidadeId
      )

      if (existe) continue

      await this.notificacaoRepository.criar({
        userId: destinatario.id,
        tipo: params.tipo,
        titulo: params.titulo,
        mensagem: params.mensagem,
        entidade: params.entidade,
        entidadeId: params.entidadeId,
      })

      criadas++

      if (destinatario.email) {
        await this.emailService.send({
          to: destinatario.email,
          subject: params.titulo,
          content: params.mensagem,
        })
        emails++
      }
    }

    return { criadas, emails }
  }

  private formatarData(data: DateTime | null) {
    if (!data) return 'data não definida'
    return data.toFormat('dd/MM/yyyy')
  }
}
