import Abastecimento from '#models/abastecimento'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class AbastecimentoRepository {
  async criar(dados: Partial<Abastecimento>, trx?: TransactionClientContract) {
    if (trx) {
      return await Abastecimento.create(dados)
    }
    return await Abastecimento.create(dados)
  }

  async listar() {
    return await Abastecimento.query().preload('viatura').orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Abastecimento.query().where('id', id).preload('viatura').first()
  }
}
