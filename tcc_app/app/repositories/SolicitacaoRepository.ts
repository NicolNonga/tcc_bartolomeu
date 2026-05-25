// eslint-disable-next-line unicorn/filename-case
import Solicitacao from '#models/solicitacao'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class SolicitacaoRepository {
  async criar(dados: Partial<Solicitacao>, trx?: TransactionClientContract) {
    if (trx) {
      return Solicitacao.create(dados, { client: trx })
    }
    return Solicitacao.create(dados)
  }

  async listar() {
    return Solicitacao.query()
      .preload('solicitante')
      .preload('departamento')
      .preload('tipoServico')
      .preload('estadoSolicitacao')
      .orderBy('id', 'desc')
  }

  async listarPorSolicitante(solicitanteId: number) {
    return Solicitacao.query()
      .where('solicitante_id', solicitanteId)
      .preload('departamento')
      .preload('tipoServico')
      .preload('estadoSolicitacao')
      .orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Solicitacao.query()
      .where('id', id)
      .preload('solicitante')
      .preload('departamento')
      .preload('tipoServico')
      .preload('estadoSolicitacao')
      .first()
  }

  async actualizar(id: number, dados: Partial<Solicitacao>, trx?: TransactionClientContract) {
    const solicitacao = await Solicitacao.findOrFail(id)
    solicitacao.merge(dados)

    if (trx) {
      solicitacao.useTransaction(trx)
    }

    await solicitacao.save()
    return solicitacao
  }
}
