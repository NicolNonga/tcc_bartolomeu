import type { HttpContext } from '@adonisjs/core/http'
import NotificacaoRepository from '#repositories/notificacao_repository'

export default class NotificacoesController {
  constructor(private readonly repository = new NotificacaoRepository()) {}

  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await this.repository.listarPorUser(
      user.id,
      request.input('nao_lidas') === 'true'
    )
    return response.ok({ data })
  }

  async marcarLida({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await this.repository.marcarComoLida(params.id, user.id)
    return response.ok({ data })
  }

  async marcarTodasLidas({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    await this.repository.marcarTodasComoLidas(user.id)
    return response.ok({ message: 'Notificações marcadas como lidas' })
  }
}
