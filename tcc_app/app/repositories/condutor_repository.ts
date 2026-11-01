import Condutor from '#models/condutor'

export default class CondutorRepository {
  async criar(dados: Partial<Condutor>) {
    return Condutor.create(dados)
  }

  async listar() {
    return Condutor.query()
      .preload('user')
      .preload('avaliacoes')
      .preload('infraccoes')
      .preload('viaturas')
      .orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Condutor.query().where('id', id).preload('user').first()
  }

  async actualizar(id: number, dados: Partial<Condutor>) {
    const condutor = await Condutor.findOrFail(id)
    condutor.merge(dados)
    await condutor.save()
    return condutor
  }

  async remover(id: number) {
    const condutor = await Condutor.find(id)
    if (!condutor) throw new Error('Condutor não encontrado')
    await condutor.delete()
  }

  async cartasAExpirar(dias = 30) {
    const limite = new Date()
    limite.setDate(limite.getDate() + dias)
    return Condutor.query()
      .where('is_active', true)
      .where('validade_carta', '<=', limite.toISOString().split('T')[0])
      .preload('user')
      .orderBy('validade_carta')
  }

  async historicoViaturas(condutorId: number) {
    const CondutorModel = (await import('#models/condutor')).default
    const condutor = await CondutorModel.find(condutorId)
    if (!condutor?.userId) return []

    const db = (await import('@adonisjs/lucid/services/db')).default
    return db
      .from('atendimento_frontas')
      .join('viaturas', 'atendimento_frontas.viatura_id', 'viaturas.id')
      .where('atendimento_frontas.motorista_id', condutor.userId)
      .select('atendimento_frontas.*', 'viaturas.matricula', 'viaturas.marca', 'viaturas.modelo')
      .orderBy('atendimento_frontas.data_saida', 'desc')
  }
}
