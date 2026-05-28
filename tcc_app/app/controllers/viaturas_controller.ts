import type { HttpContext } from '@adonisjs/core/http'
import CriarViaturaService from '#services/viaturas/criar_viatura_service'
import {
  criarViaturaValidator,
  criarViaturaValidorMassage,
} from '#validators/criar_viatura_validator'
import ListarViaturaService from '#services/viaturas/listar_viatura_service'
export default class ViaturasController {
  constructor(
    private readonly criarViacturaService = new CriarViaturaService(),
    private readonly listarViaturaService = new ListarViaturaService()
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
}
