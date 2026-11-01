import Abastecimento from '#models/abastecimento'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class AbastecimentoRepository {
  async criar(dados: Partial<Abastecimento>, trx?: TransactionClientContract) {
    if (trx) {
      return await Abastecimento.create(dados, { client: trx })
    }
    return await Abastecimento.create(dados)
  }

  async listar() {
    return await Abastecimento.query()
      .preload('viatura')
      .preload('condutor')
      .preload('cartaoCombustivel')
      .orderBy('id', 'desc')
  }

  async listarPorViatura(viaturaId: number) {
    return Abastecimento.query()
      .where('viatura_id', viaturaId)
      .whereNotNull('quilometragem_registrada')
      .orderBy('data_abastecimento', 'asc')
  }

  async relatorioCustos(filtros?: {
    viaturaId?: number
    condutorId?: number
    dataInicio?: string
    dataFim?: string
  }) {
    const query = Abastecimento.query()
      .preload('viatura')
      .preload('condutor')
      .orderBy('data_abastecimento', 'desc')

    if (filtros?.viaturaId) query.where('viatura_id', filtros.viaturaId)
    if (filtros?.condutorId) query.where('condutor_id', filtros.condutorId)
    if (filtros?.dataInicio) query.where('data_abastecimento', '>=', filtros.dataInicio)
    if (filtros?.dataFim) query.where('data_abastecimento', '<=', filtros.dataFim)

    return query
  }

  async buscarPorId(id: number) {
    return Abastecimento.query().where('id', id).preload('viatura').first()
  }

  async actualizar(id: number, dados: Record<string, unknown>) {
    const abastecimento = await Abastecimento.find(id)
    if (!abastecimento) return null
    abastecimento.merge(dados as any)
    await abastecimento.save()
    return abastecimento
  }

  async remover(id: number) {
    const abastecimento = await Abastecimento.find(id)
    if (!abastecimento) return false
    await abastecimento.delete()
    return true
  }
}
