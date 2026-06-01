import AtendimentoFrota from '#models/atendimento_frota'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class AtendimentoFrotaRepository {
  async criar(dados: Partial<AtendimentoFrota>, trx?: TransactionClientContract) {
    if (trx) {
      return await AtendimentoFrota.create(dados, { client: trx })
    }
    return await AtendimentoFrota.create(dados)
  }

  async listar() {
    return AtendimentoFrota.query()
      .preload('solicitacao')
      .preload('viatura')
      .preload('motorista')
      .orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return AtendimentoFrota.query()
      .where('id', id)
      .preload('solicitacao')
      .preload('viatura')
      .preload('motorista')
      .first()
  }

  async actualizar(id: number, dados: Partial<AtendimentoFrota>, trx?: TransactionClientContract) {
    const atendimento = await AtendimentoFrota.find(id)
    if (!atendimento) {
      return null
    }
    atendimento.merge(dados)
    if (trx) {
      atendimento.useTransaction(trx)
    }
    await atendimento.save()
    return atendimento
  }
}
