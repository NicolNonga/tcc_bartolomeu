import type { HttpContext } from '@adonisjs/core/http'
import AtendimentoFrotaRepository from '#repositories/atendimento_frota_repository'
import CriarAtendimentoFrotaService from '#services/atendimentoFrota/criar_atendmento_fronta_service'
import FinalizarAtendimentoFrotaService from '#services/atendimentoFrota/finalizar_atendimento_frota_service'
import {
  criarAtendimentoFrotaValidationMessage,
  criarAtendimentoFrotaValidator,
} from '#validators/criar_atendimento_frota'
import {
  finalizarAtendimentoFrotaValidationMessage,
  finalizarAtendimentoFrotaValidator,
} from '#validators/finalizar_atendimento_frota'

export default class AtendimentosFrotaController {
  constructor(
    private atendimentoFrotaRepository = new AtendimentoFrotaRepository(),
    private criarAtendimentoFrotaService = new CriarAtendimentoFrotaService(),
    private finalizarAtendimentoFrotaService = new FinalizarAtendimentoFrotaService()
  ) {}
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarAtendimentoFrotaValidator, {
      messagesProvider: criarAtendimentoFrotaValidationMessage,
    })
    await this.criarAtendimentoFrotaService.execute(payload)
    return response.created({
      message: 'Atendimento de frota criado com sucesso',
    })
  }

  async index({ response }: HttpContext) {
    const atendimentos = await this.atendimentoFrotaRepository.listar()
    return response.ok({
      data: atendimentos,
    })
  }

  async show({ params, response }: HttpContext) {
    const atendimento = await this.atendimentoFrotaRepository.buscarPorId(params.id)
    if (!atendimento) {
      return response.notFound({
        message: 'Atendimento de frota nao encontrado',
      })
    }
    return response.ok({
      data: atendimento,
    })
  }

  async finalizar({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(finalizarAtendimentoFrotaValidator, {
      messagesProvider: finalizarAtendimentoFrotaValidationMessage,
    })
    const atendimento = await this.finalizarAtendimentoFrotaService.execute(params.id, payload)
    if (!atendimento) {
      return response.notFound({
        message: 'Atendimento de frota nao encontrado',
      })
    }
    return response.ok({
      message: 'Atendimento de frota finalizado com sucesso',
    })
  }
}
