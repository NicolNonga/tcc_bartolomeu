import type { HttpContext } from '@adonisjs/core/http'
import ManutencaoPecaRepository from '#repositories/manutencao_peca_repository'
import { criarManutencaoPecaValidator } from '#validators/manutencao_extra_validator'

export default class ManutencaoPecasController {
  constructor(private readonly repository = new ManutencaoPecaRepository()) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorManutencao(params.manutencaoId)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarManutencaoPecaValidator)
    const quantidade = payload.quantidade || 1
    const custoTotal = quantidade * payload.custo_unitario
    const peca = await this.repository.criar({
      manutencaoId: payload.manutencao_id,
      nomePeca: payload.nome_peca,
      quantidade,
      custoUnitario: payload.custo_unitario,
      custoTotal,
      observacao: payload.observacao || null,
    })
    return response.created({ message: 'Peça registada', data: peca })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Peça removida' })
  }
}
