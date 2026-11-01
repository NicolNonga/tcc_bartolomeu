import type { HttpContext } from '@adonisjs/core/http'
import AvaliacaoCondutorRepository from '#repositories/avaliacao_condutor_repository'
import { criarAvaliacaoValidator } from '#validators/infraccao_avaliacao_validator'

export default class AvaliacoesCondutorController {
  constructor(private readonly repository = new AvaliacaoCondutorRepository()) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorCondutor(params.condutorId)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarAvaliacaoValidator)
    const avaliacao = await this.repository.criar({
      condutorId: payload.condutor_id,
      avaliadorId: payload.avaliador_id || null,
      dataAvaliacao: payload.data_avaliacao as any,
      pontuacao: payload.pontuacao,
      comentario: payload.comentario || null,
    })
    return response.created({ message: 'Avaliação registada', data: avaliacao })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Avaliação removida' })
  }
}
