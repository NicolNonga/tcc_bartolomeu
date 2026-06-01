import ManutencaoRepository from '#repositories/manutencao_repository'
import CriarManutencaoService from '#services/manutencao/criar_manutencao_service'
import FinalizarManutencaoService from '#services/manutencao/finalizar_manutencao_service'
import {
  createManutencaoValidator,
  criarManutencaoValidatorMessage,
} from '#validators/criar_manuntecao'
import {
  finalizarManutencaoMessageValidor,
  finalizarManutencaoValidator,
} from '#validators/finalizar_manutencao'
import type { HttpContext } from '@adonisjs/core/http'

export default class ManutencoesController {
  constructor(
    private manuntecaoRepository = new ManutencaoRepository(),
    private criarManuntecaoService = new CriarManutencaoService(),
    private finalizarManutencaoService = new FinalizarManutencaoService()
  ) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createManutencaoValidator, {
      messagesProvider: criarManutencaoValidatorMessage,
    })
    await this.criarManuntecaoService.execute(payload)
    return response.created({
      message: 'manutencao criada com sucesso',
    })
  }

  async index({ response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.listar()
    return response.ok({ data: manutencao })
  }
  async show({ params, response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.buscarPorId(params.id)

    if (!manutencao) {
      return response.notFound({
        message: 'manutencao nao encontrada',
      })
    }
    return response.ok({ data: manutencao })
  }

  async finalizar({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(finalizarManutencaoValidator, {
      messagesProvider: finalizarManutencaoMessageValidor,
    })
    const manutencao = await this.finalizarManutencaoService.execute(params.id, payload)

    if (!manutencao) {
      return response.notFound({
        message: 'manutencao nao encontrada',
      })
    }

    return response.ok({ message: 'manutenção finalizad com sucesso' })
  }
}
