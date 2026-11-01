import type { HttpContext } from '@adonisjs/core/http'
import CartaoCombustivelRepository from '#repositories/cartao_combustivel_repository'
import {
  criarCartaoCombustivelValidator,
  actualizarCartaoCombustivelValidator,
} from '#validators/cartao_combustivel_validator'

export default class CartoesCombustivelController {
  constructor(private readonly repository = new CartaoCombustivelRepository()) {}

  async index({ response }: HttpContext) {
    const data = await this.repository.listar()
    return response.ok({ data })
  }

  async show({ params, response }: HttpContext) {
    const cartao = await this.repository.buscarPorId(params.id)
    if (!cartao) return response.notFound({ message: 'Cartão não encontrado' })
    return response.ok({ data: cartao })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarCartaoCombustivelValidator)
    const cartao = await this.repository.criar({
      numeroCartao: payload.numero_cartao,
      fornecedor: payload.fornecedor || null,
      viaturaId: payload.viatura_id || null,
      condutorId: payload.condutor_id || null,
      limiteMensal: payload.limite_mensal || null,
      observacao: payload.observacao || null,
    })
    return response.created({ message: 'Cartão registado', data: cartao })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(actualizarCartaoCombustivelValidator)
    const cartao = await this.repository.actualizar(params.id, {
      numeroCartao: payload.numero_cartao,
      fornecedor: payload.fornecedor,
      viaturaId: payload.viatura_id,
      condutorId: payload.condutor_id,
      limiteMensal: payload.limite_mensal,
      isActive: payload.is_active,
      observacao: payload.observacao,
    })
    return response.ok({ data: cartao })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Cartão removido' })
  }
}
