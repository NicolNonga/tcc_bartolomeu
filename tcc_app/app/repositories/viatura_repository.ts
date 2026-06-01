import Viatura from '#models/viatura'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ViaturaRepository {
  async criar(dados: Partial<Viatura>, trx?: TransactionClientContract) {
    if (trx) {
      return await Viatura.create(dados, { client: trx })
    }
    return Viatura.create(dados)
  }

  async listar() {
    return Viatura.query().orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Viatura.find(id)
  }

  async actualizar(id: number, dados: Partial<Viatura>, trx?: TransactionClientContract) {
    const viatura = await this.buscarPorId(id)
    if (!viatura) throw Error('Viatura Não encontrada')
    viatura.merge(dados)
    if (trx) {
      viatura.useTransaction(trx)
    }
    await viatura.save()
    return viatura
  }

  async remover(id: number) {
    const viatura = await this.buscarPorId(id)
    if (!viatura) throw Error('Viatuar Não encontrada')
    await viatura.delete()
  }
}
