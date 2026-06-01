import Manutencao from '#models/manutencao'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ManutencaoRepository {
  async criar(dados: Partial<Manutencao>, trx?: TransactionClientContract) {
    if (trx) {
      return Manutencao.create(dados, { client: trx })
    }
    return Manutencao.create(dados)
  }

  async listar() {
    return Manutencao.query().preload('viatura').orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Manutencao.query().where('id', id).preload('viatura').first()
  }

  async actualizar(id: number, dados: Partial<Manutencao>, trx?: TransactionClientContract) {
    const manutencao = await Manutencao.find(id)
    if (!manutencao) {
      return null
    }
    manutencao.merge(dados)
    if (trx) {
      await manutencao.useTransaction(trx)
    }
    await manutencao.save()
    return manutencao
  }
}
