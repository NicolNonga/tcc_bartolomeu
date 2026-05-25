import type { HttpContext } from '@adonisjs/core/http'
import CriarDespachoService from '#services/despachos/criar_despacho_service'
import DespachoRepository from '#repositories/despacho_repository'
import {
  criarDespachoValidationMessage,
  criarDespachoValidator,
} from '#validators/criar_despacho_validator'

export default class DespachosController {
  constructor(
    private readonly criarDespachoService = new CriarDespachoService(),
    private readonly despachoRepository = new DespachoRepository()
  ) {}

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(criarDespachoValidator, {
      messagesProvider: criarDespachoValidationMessage,
    })
    await this.criarDespachoService.execute(payload, auth.user!.id)

    response.created({
      message: 'despacho registrado com sucesso',
    })
  }

  async historico({ params, response }: HttpContext) {
    const despachos = await this.despachoRepository.listarPorSolicitacao(params.solicitacaoId)
    response.ok({
      message: 'histórico de despachos recuperado com sucesso',
      data: despachos,
    })
  }
}
