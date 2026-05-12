import Departamento from '#models/departamento'

export default class DepartamentoRepository {
  async criar(dados: Partial<Departamento>) {
    return Departamento.create(dados)
  }

  async listar() {
    return Departamento.query().orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Departamento.find(id)
  }

  async actualizar(id: number, dados: Partial<Departamento>) {
    const departamento = await Departamento.findOrFail(id)
    departamento.merge(dados)
    await departamento.save()

    return departamento
  }

  async remover(id: number) {
    const departamento = await Departamento.find(id)
    if (!departamento) {
      throw new Error('Departamento não encontrado')
    }
    await departamento.delete()
  }
}
