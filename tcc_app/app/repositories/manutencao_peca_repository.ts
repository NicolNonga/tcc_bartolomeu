import ManutencaoPeca from '#models/manutencao_peca'

export default class ManutencaoPecaRepository {
  async criar(dados: Partial<ManutencaoPeca>) {
    return ManutencaoPeca.create(dados)
  }

  async listarPorManutencao(manutencaoId: number) {
    return ManutencaoPeca.query().where('manutencao_id', manutencaoId).orderBy('id')
  }

  async remover(id: number) {
    const peca = await ManutencaoPeca.find(id)
    if (!peca) throw new Error('Peça não encontrada')
    await peca.delete()
  }
}
