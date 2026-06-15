import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/relatorio/dashboard_service'

export default class DashboardController {
  constructor(private readonly dashboardService = new DashboardService()) {}
  async index({ response }: HttpContext) {
    const dashboard = await this.dashboardService.execute()
    return response.ok({ data: dashboard })
  }
}
