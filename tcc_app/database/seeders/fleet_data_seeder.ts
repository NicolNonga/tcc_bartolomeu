import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Viatura from '#models/viatura'
import DocumentoViatura from '#models/documento_viatura'
import HistoricoQuilometragem from '#models/historico_quilometragem'
import ManutencaoAgendamento from '#models/manutencao_agendamento'
import CartaoCombustivel from '#models/cartao_combustivel'
import Condutor from '#models/condutor'
import Manutencao from '#models/manutencao'
import Abastecimento from '#models/abastecimento'

import { TipoDocumentoViatura } from '../../app/enum/viatura_enum.js'

export default class extends BaseSeeder {
  async run() {
    const viaturas = await Viatura.all()
    const condutores = await Condutor.all()

    for (const viatura of viaturas) {
      await DocumentoViatura.updateOrCreate(
        { viaturaId: viatura.id, tipoDocumento: TipoDocumentoViatura.SEGURO },
        {
          numeroDocumento: `SEG-${viatura.matricula}`,
          entidadeEmissora: 'ENS Seguros',
          dataEmissao: DateTime.now().minus({ months: 11 }),
          dataValidade: DateTime.now().plus({ days: 15 }),
          observacao: 'Seguro obrigatório',
        }
      )

      await DocumentoViatura.updateOrCreate(
        { viaturaId: viatura.id, tipoDocumento: TipoDocumentoViatura.INSPECCAO },
        {
          numeroDocumento: `INSP-${viatura.matricula}`,
          entidadeEmissora: 'IMTT',
          dataEmissao: DateTime.now().minus({ months: 6 }),
          dataValidade: DateTime.now().plus({ months: 6 }),
        }
      )

      await DocumentoViatura.updateOrCreate(
        { viaturaId: viatura.id, tipoDocumento: TipoDocumentoViatura.LICENCA_CIRCULACAO },
        {
          numeroDocumento: `LC-${viatura.matricula}`,
          entidadeEmissora: 'Ministério dos Transportes',
          dataEmissao: DateTime.now().minus({ years: 1 }),
          dataValidade: DateTime.now().plus({ days: 25 }),
        }
      )

      await HistoricoQuilometragem.firstOrCreate(
        {
          viaturaId: viatura.id,
          quilometragem: viatura.quilometragemActual,
        },
        {
          dataRegisto: DateTime.now(),
          origem: 'seeder',
          observacao: 'Registo inicial',
        }
      )
    }

    const hilux = await Viatura.findBy('matricula', 'LD-12-34-AB')
    const sprinter = await Viatura.findBy('matricula', 'LD-56-78-CD')

    if (hilux) {
      await ManutencaoAgendamento.firstOrCreate(
        { viaturaId: hilux.id, descricao: 'Revisão dos 50.000 km' },
        {
          tipoAgendamento: 'por_km',
          quilometragemAlvo: 50000,
          observacao: 'Troca de óleo e filtros',
        }
      )

      await ManutencaoAgendamento.firstOrCreate(
        { viaturaId: hilux.id, descricao: 'Inspecção técnica anual' },
        {
          tipoAgendamento: 'por_data',
          dataAlvo: DateTime.now().plus({ days: 20 }),
        }
      )
    }

    if (sprinter && condutores[2]) {
      await CartaoCombustivel.updateOrCreate(
        { numeroCartao: 'CARTAO-001' },
        {
          fornecedor: 'Sonangol',
          viaturaId: sprinter.id,
          condutorId: condutores[2].id,
          limiteMensal: 150000,
          observacao: 'Cartão frota pesada',
        }
      )
    }

    if (hilux && condutores[0]) {
      const manutencaoExistente = await Manutencao.query()
        .where('viatura_id', hilux.id)
        .where('descricao', 'Revisão programada')
        .first()

      if (!manutencaoExistente) {
        await Manutencao.create({
          viaturaId: hilux.id,
          tipoManutencao: 'preventiva',
          descricao: 'Revisão programada',
          oficina: 'Oficina Central',
          dataEntrada: DateTime.now().minus({ months: 2 }),
          dataSaida: DateTime.now().minus({ months: 2 }).plus({ days: 2 }),
          quilometragemManutencao: 40000,
          custo: 85000,
          estadoManutencao: 'concluida',
        })
      }

      const abastecimentoExistente = await Abastecimento.query()
        .where('viatura_id', hilux.id)
        .first()

      if (!abastecimentoExistente) {
        await Abastecimento.createMany([
          {
            viaturaId: hilux.id,
            condutorId: condutores[0].id,
            dataAbastecimento: DateTime.now().minus({ days: 30 }),
            tipoCombustivel: 'diesel',
            quantidadeLitros: 60,
            valorTotal: 42000,
            quilometragemRegistrada: 42000,
            postoAbastecimento: 'Sonangol - Maianga',
          },
          {
            viaturaId: hilux.id,
            condutorId: condutores[0].id,
            dataAbastecimento: DateTime.now().minus({ days: 5 }),
            tipoCombustivel: 'diesel',
            quantidadeLitros: 55,
            valorTotal: 38500,
            quilometragemRegistrada: 45000,
            postoAbastecimento: 'Sonangol - Talatona',
          },
        ])
      }
    }
  }
}
