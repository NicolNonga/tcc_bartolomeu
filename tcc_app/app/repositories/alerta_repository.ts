import DocumentoViaturaRepository from '#repositories/documento_viatura_repository'
import CondutorRepository from '#repositories/condutor_repository'
import ManutencaoAgendamentoRepository from '#repositories/manutencao_agendamento_repository'
import db from '@adonisjs/lucid/services/db'

export default class AlertaRepository {
  constructor(
    private documentoRepo = new DocumentoViaturaRepository(),
    private condutorRepo = new CondutorRepository(),
    private agendamentoRepo = new ManutencaoAgendamentoRepository()
  ) {}

  async todos(dias = 30) {
    const [documentos, cartas, agendamentos] = await Promise.all([
      this.documentoRepo.documentosAExpirar(dias),
      this.condutorRepo.cartasAExpirar(dias),
      this.agendamentosPendentes(),
    ])

    return { documentos, cartas, agendamentos }
  }

  private async agendamentosPendentes() {
    const agendamentos = await this.agendamentoRepo.agendamentosPendentes()
    const viaturas = await db.from('viaturas').select('id', 'quilometragem_actual')
    const kmMap = Object.fromEntries(viaturas.map((v) => [v.id, Number(v.quilometragem_actual)]))

    return agendamentos.filter((a) => {
      if (a.tipoAgendamento === 'por_data' && a.dataAlvo) {
        const limite = new Date()
        limite.setDate(limite.getDate() + 30)
        return a.dataAlvo.toJSDate() <= limite
      }
      if (a.tipoAgendamento === 'por_km' && a.quilometragemAlvo) {
        const kmActual = kmMap[a.viaturaId] || 0
        return kmActual >= a.quilometragemAlvo - 500
      }
      return false
    })
  }
}
