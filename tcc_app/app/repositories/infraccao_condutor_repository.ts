import InfraccaoCondutor from '#models/infraccao_condutor'

export default class InfraccaoCondutorRepository {
  async criar(dados: Partial<InfraccaoCondutor>) {
    return InfraccaoCondutor.create(dados)
  }

  async listarPorCondutor(condutorId: number) {
    return InfraccaoCondutor.query()
      .where('condutor_id', condutorId)
      .preload('viatura')
      .orderBy('data_infraccao', 'desc')
  }

  async buscarPorId(id: number) {
    return InfraccaoCondutor.query().where('id', id).preload('viatura').first()
  }

  async remover(id: number) {
    const infraccao = await InfraccaoCondutor.find(id)
    if (!infraccao) throw new Error('Infração não encontrada')
    await infraccao.delete()
  }
}
