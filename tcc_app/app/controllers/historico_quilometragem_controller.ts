import type { HttpContext } from '@adonisjs/core/http'
import HistoricoQuilometragemRepository from '#repositories/historico_quilometragem_repository'
import CriarHistoricoQuilometragemService from '#services/viaturas/criar_historico_quilometragem_service'
import { criarHistoricoQuilometragemValidator } from '#validators/documento_viatura_validator'

export default class HistoricoQuilometragemController {
  constructor(
    private readonly repository = new HistoricoQuilometragemRepository(),
    private readonly criarService = new CriarHistoricoQuilometragemService()
  ) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorViatura(params.viaturaId)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarHistoricoQuilometragemValidator)
    const data = await this.criarService.execute(payload)
    return response.created({ message: 'Quilometragem registada', data })
  }
}
