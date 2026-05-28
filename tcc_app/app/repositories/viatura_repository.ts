import Viatura from '#models/viatura'

export default class ViaturaRepository {
  async criar(dados: Partial<Viatura>) {
    return Viatura.create(dados)
  }

  async listar() {
    return Viatura.query().orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return Viatura.find(id)
  }

  async actualizar(id: number, dados: Partial<Viatura>) {
    const viatura = await this.buscarPorId(id)
    if (!viatura) throw Error('Viatura Não encontrada')
    viatura.merge(dados)
    await viatura.save()
    return viatura
  }

  async remover(id: number) {
    const viatura = await this.buscarPorId(id)
    if (!viatura) throw Error('Viatuar Não encontrada')
    await viatura.delete()
  }
}
