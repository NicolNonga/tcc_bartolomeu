import DespachoRepository from '#repositories/despacho_repository'
import SolicitacaoRepository from '#repositories/SolicitacaoRepository'
import db from '@adonisjs/lucid/services/db'

export default class CriarDespachoService {
  constructor(
    private despachoRepository = new DespachoRepository(),
    private solicitacaoRepository = new SolicitacaoRepository()
  ) {}

  async execute(payload: any, gestorId: number) {
    const trx = await db.transaction()

    try {
      const despacho = await this.despachoRepository.criar(
        {
          ...payload,
          gestor_id: gestorId,
          data_despacho: new Date().toISOString().split('T')[0],
        },
        trx
      )

      await this.solicitacaoRepository.actualizar(
        payload.solicitacao_id,
        { estadoSolicitacaoId: payload.estado_solicitacao_id },
        trx
      )

      await trx.commit()
      return despacho
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
