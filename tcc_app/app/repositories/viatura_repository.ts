import Viatura from '#models/viatura'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ViaturaRepository {
  async criar(dados: Partial<Viatura>, trx?: TransactionClientContract) {
    if (trx) {
      return await Viatura.create(dados, { client: trx })
    }
    return Viatura.create(dados)
  }

  async buscarPorId(id: number) {
    return Viatura.query()
      .where('id', id)
      .preload('condutorResponsavel', (q) => q.preload('user'))
      .preload('documentos')
      .preload('historicoQuilometragem')
      .preload('anexos')
      .first()
  }

  async listar() {
    return Viatura.query()
      .preload('condutorResponsavel', (q) => q.preload('user'))
      .preload('documentos')
      .orderBy('id', 'desc')
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
