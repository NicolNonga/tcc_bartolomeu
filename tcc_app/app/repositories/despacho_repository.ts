import Despacho from '#models/despacho'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class DespachoRepository {
  async criar(dados: Partial<Despacho>, trx?: TransactionClientContract) {
    if (trx) {
      return Despacho.create(dados, { client: trx })
    }
    return Despacho.create(dados)
  }

  async listarPorSolicitacao(solicitacaoId: number) {
    return Despacho.query()
      .where('solicitacao_id', solicitacaoId)
      .preload('gestor')
      .preload('estadoSolicitacao')
      .orderBy('id', 'desc')
  }
}
