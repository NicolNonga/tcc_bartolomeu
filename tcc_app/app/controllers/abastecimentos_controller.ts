import type { HttpContext } from '@adonisjs/core/http'

import AbastecimentoRepository from '#repositories/abastecimento_repository'
import CriarAbastecimentoService from '#services/abastecimento/criar_abastecimento_service'
import { criarAbastecimentoValidator } from '#validators/criar_abastecimento'
import { criarAbastcimentoValidatorMessage } from '#validators/criar_abastecimento'

export default class AbastecimentosController {
  constructor(
    private readonly repository = new AbastecimentoRepository(),
    private readonly criarAbastecimentoService = new CriarAbastecimentoService()
  ) {}
  async index({ response }: HttpContext) {
    const abasticemento = await this.repository.listar()
    return response.ok({ data: abasticemento })
  }

  async show({ params, response }: HttpContext) {
    const abastecimento = await this.repository.buscarPorId(params.id)
    return response.ok({ data: abastecimento })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarAbastecimentoValidator, {
      messagesProvider: criarAbastcimentoValidatorMessage,
    })
    await this.criarAbastecimentoService.execute(payload)

    return response.created({
      message: 'abastecimento criada com sucesso',
    })
  }
}
