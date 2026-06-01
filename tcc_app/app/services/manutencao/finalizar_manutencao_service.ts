import ManutencaoRepository from '#repositories/manutencao_repository'
import ViaturaRepository from '#repositories/viatura_repository'
import { DateTime } from 'luxon'
import { EstadoOperacional } from '../../enum/viatura_enum.js'
import db from '@adonisjs/lucid/services/db'

export default class FinalizarManutencaoService {
  constructor(
    private manutencaoRepository = new ManutencaoRepository(),
    private viaturaRepository = new ViaturaRepository()
  ) {}

  async execute(id: number, payload: any) {
    const trx = await db.transaction()

    try {
      const manutencao = await this.manutencaoRepository.actualizar(
        id,
        {
          dataSaida: DateTime.fromJSDate(payload.data_saida),
          custo: payload.custo,
          observacao: payload.observacao,
          estadoManutencao: 'concluida',
        },
        trx
      )

      if (!manutencao) {
        return null
      }
      await this.viaturaRepository.actualizar(
        manutencao.viaturaId,
        {
          estadoOperacional: EstadoOperacional.DISPONIVEL,
        },
        trx
      )

      await trx.commit()
      return manutencao
    } catch (error) {
      await trx.rollback()
    }
  }
}
