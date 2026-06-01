import ManutencaoRepository from '#repositories/manutencao_repository'
import ViaturaRepository from '#repositories/viatura_repository'
import db from '@adonisjs/lucid/services/db'
import { EstadoOperacional } from '../../enum/viatura_enum.js'
import { DateTime } from 'luxon'

export default class CriarManutencaoService {
  constructor(
    private manutencaoRepository = new ManutencaoRepository(),
    private viaturaRepository = new ViaturaRepository()
  ) {}

  async execute(payload: any) {
    const trx = await db.transaction()
    try {
      const manutencao = await this.manutencaoRepository.criar(
        {
          ...payload,
          dataEntrada: DateTime.fromJSDate(payload.data_entrada),
          dataSaida: payload.data_saida ? DateTime.fromJSDate(payload.data_saida) : null,
          estadoManutencao: 'aberta',
        },
        trx
      )

      await this.viaturaRepository.actualizar(
        payload.viatura_id,
        {
          estadoOperacional: EstadoOperacional.EM_MANUTENCAO,
        },
        trx
      )
      await trx.commit()
      return manutencao
    } catch (error) {
      console.log(error)
      await trx.rollback()
    }
  }
}
