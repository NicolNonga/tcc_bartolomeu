import type { HttpContext } from '@adonisjs/core/http'
import CriarViaturaService from '#services/viaturas/criar_viatura_service'
import ActualizarViaturaService from '#services/viaturas/actualizar_viatura_service'
import {
  criarViaturaValidator,
  criarViaturaValidorMassage,
} from '#validators/criar_viatura_validator'
import {
  actualizarViaturaValidator,
  actualizarViaturaMessages,
} from '#validators/actualizar_viatura'
import ListarViaturaService from '#services/viaturas/listar_viatura_service'
import ViaturaRepository from '#repositories/viatura_repository'

export default class ViaturasController {
  constructor(
    private readonly criarViacturaService = new CriarViaturaService(),
    private readonly listarViaturaService = new ListarViaturaService(),
    private readonly actualizarViaturaService = new ActualizarViaturaService(),
    private readonly viaturaRepository = new ViaturaRepository()
  ) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarViaturaValidator, {
      messagesProvider: criarViaturaValidorMassage,
    })

    await this.criarViacturaService.execute(payload)

    response.created({
      message: 'viatura registrado com sucesso',
    })
  }

  async listar({ response }: HttpContext) {
    const data = await this.listarViaturaService.execute()
    return response.ok({ data: data })
  }

  async show({ params, response }: HttpContext) {
    const viatura = await this.viaturaRepository.buscarPorId(params.id)
    if (!viatura) return response.notFound({ message: 'Viatura não encontrada' })
    return response.ok({ data: viatura })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(actualizarViaturaValidator, {
      messagesProvider: actualizarViaturaMessages,
    })
    const viatura = await this.actualizarViaturaService.execute(params.id, payload)
    return response.ok({ message: 'Viatura actualizada', data: viatura })
  }

  async destroy({ params, response }: HttpContext) {
    await this.viaturaRepository.actualizar(params.id, { estadoViatura: 'abatido' as any })
    return response.ok({ message: 'Viatura abatida com sucesso' })
  }
}
