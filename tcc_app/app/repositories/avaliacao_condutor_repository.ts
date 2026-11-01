import AvaliacaoCondutor from '#models/avaliacao_condutor'

export default class AvaliacaoCondutorRepository {
  async criar(dados: Partial<AvaliacaoCondutor>) {
    return AvaliacaoCondutor.create(dados)
  }

  async listarPorCondutor(condutorId: number) {
    return AvaliacaoCondutor.query()
      .where('condutor_id', condutorId)
      .preload('avaliador')
      .orderBy('data_avaliacao', 'desc')
  }

  async remover(id: number) {
    const avaliacao = await AvaliacaoCondutor.find(id)
    if (!avaliacao) throw new Error('Avaliação não encontrada')
    await avaliacao.delete()
  }
}
