import type { HttpContext } from '@adonisjs/core/http'
import RelatoriosService from '#services/relatorio/relatorio_geral_service'

export default class RelatoriosController {
  constructor(private readonly relatorioService = new RelatoriosService()) {}
  async index({ response }: HttpContext) {
    const relatorio = await this.relatorioService.execute()
    return response.ok({ data: relatorio })
  }
}
