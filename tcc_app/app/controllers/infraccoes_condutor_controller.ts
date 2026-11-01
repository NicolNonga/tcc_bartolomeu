import type { HttpContext } from '@adonisjs/core/http'
import InfraccaoCondutorRepository from '#repositories/infraccao_condutor_repository'
import { criarInfraccaoValidator } from '#validators/infraccao_avaliacao_validator'

export default class InfraccoesCondutorController {
  constructor(private readonly repository = new InfraccaoCondutorRepository()) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorCondutor(params.condutorId)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarInfraccaoValidator)
    const infraccao = await this.repository.criar({
      condutorId: payload.condutor_id,
      viaturaId: payload.viatura_id || null,
      dataInfraccao: payload.data_infraccao as any,
      local: payload.local || null,
      descricao: payload.descricao,
      gravidade: (payload.gravidade || 'leve') as any,
      valorMulta: payload.valor_multa || null,
      observacao: payload.observacao || null,
    })
    return response.created({ message: 'Infração registada', data: infraccao })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Infração removida' })
  }
}
