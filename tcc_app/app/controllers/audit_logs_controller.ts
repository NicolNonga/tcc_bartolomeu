import type { HttpContext } from '@adonisjs/core/http'
import AuditLogRepository from '#repositories/audit_log_repository'

export default class AuditLogsController {
  constructor(private readonly repository = new AuditLogRepository()) {}

  async index({ request, response }: HttpContext) {
    const data = await this.repository.listar({
      entidade: request.input('entidade'),
      userId: request.input('user_id'),
    })
    return response.ok({ data })
  }
}
