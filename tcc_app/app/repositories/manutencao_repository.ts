import Manutencao from '#models/manutencao'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class ManutencaoRepository {
  async criar(dados: any, trx?: TransactionClientContract) {
    const { pecas_substituidas, ...dadosManutencao } = dados

    const manutencao = trx
      ? await Manutencao.create(dadosManutencao, { client: trx })
      : await Manutencao.create(dadosManutencao)

    if (pecas_substituidas?.length) {
      await manutencao.related('pecasSubstituidas').createMany(
        pecas_substituidas.map((peca: any) => {
          const quantidade = Number(peca.quantidade) || 1
          const custoUnitario = Number(peca.custo) || 0

          return {
            nomePeca: peca.nome,
            quantidade,
            custoUnitario,
            custoTotal: custoUnitario * quantidade,
            observacao: peca.observacao ?? null,
          }
        })
      )
    }

    return manutencao
  }

  async listar() {
    return Manutencao.query().preload('viatura').preload('pecasSubstituidas').orderBy('id', 'desc')
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

  async remover(id: number, trx?: TransactionClientContract) {
    const manutencao = await Manutencao.find(id)
    if (!manutencao) return null
    if (trx) manutencao.useTransaction(trx)
    await manutencao.related('pecasSubstituidas').query().delete()
    await manutencao.delete()
    return manutencao
  }
}
