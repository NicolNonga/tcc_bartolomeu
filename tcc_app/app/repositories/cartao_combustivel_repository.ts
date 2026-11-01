import CartaoCombustivel from '#models/cartao_combustivel'

export default class CartaoCombustivelRepository {
  async criar(dados: Partial<CartaoCombustivel>) {
    return CartaoCombustivel.create(dados)
  }

  async listar() {
    return CartaoCombustivel.query()
      .preload('viatura')
      .preload('condutor')
      .orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return CartaoCombustivel.query()
      .where('id', id)
      .preload('viatura')
      .preload('condutor')
      .first()
  }

  async actualizar(id: number, dados: Partial<CartaoCombustivel>) {
    const cartao = await CartaoCombustivel.findOrFail(id)
    cartao.merge(dados)
    await cartao.save()
    return cartao
  }

  async remover(id: number) {
    const cartao = await CartaoCombustivel.find(id)
    if (!cartao) throw new Error('Cartão não encontrado')
    await cartao.delete()
  }
}
