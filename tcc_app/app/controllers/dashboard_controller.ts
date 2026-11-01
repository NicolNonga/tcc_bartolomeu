import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/relatorio/dashboard_service'

export default class DashboardController {
  constructor(private readonly dashboardService = new DashboardService()) {}
  async index({ response }: HttpContext) {
    const dashboard = await this.dashboardService.execute()
    return response.ok({ data: dashboard })
  }

  async custosPorViatura({ response }: HttpContext) {
    const data = await this.dashboardService.custosPorViatura()
    return response.ok({ data })
  }

  async disponibilidade({ response }: HttpContext) {
    const data = await this.dashboardService.disponibilidadeFrota()
    return response.ok({ data })
  }

  async consumoMedio({ response }: HttpContext) {
    const data = await this.dashboardService.consumoMedioFrota()
    return response.ok({ data })
  }
}
