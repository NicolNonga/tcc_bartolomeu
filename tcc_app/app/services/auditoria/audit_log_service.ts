import AuditLogRepository from '#repositories/audit_log_repository'

export default class AuditLogService {
  constructor(private repository = new AuditLogRepository()) {}

  async registar(params: {
    userId?: number
    accao: string
    entidade: string
    entidadeId?: number
    dadosAnteriores?: Record<string, unknown>
    dadosNovos?: Record<string, unknown>
    ip?: string
  }) {
    return this.repository.registar(params)
  }
}
