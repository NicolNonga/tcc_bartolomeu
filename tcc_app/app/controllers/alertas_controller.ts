import type { HttpContext } from '@adonisjs/core/http'
import AlertaService from '#services/alertas/alerta_service'
import GerarNotificacoesVencimentoService from '#services/alertas/gerar_notificacoes_vencimento_service'

export default class AlertasController {
  constructor(
    private readonly alertaService = new AlertaService(),
    private readonly gerarNotificacoesService = new GerarNotificacoesVencimentoService()
  ) {}

  async index({ request, response }: HttpContext) {
    const dias = Number(request.input('dias', 30))
    const data = await this.alertaService.execute(dias)
    return response.ok({ data })
  }

  async gerarNotificacoes({ request, response }: HttpContext) {
    const dias = Number(request.input('dias', 30))
    const resultado = await this.gerarNotificacoesService.execute(dias)
    return response.ok({
      message: 'Notificações geradas com sucesso',
      data: resultado,
    })
  }
}
