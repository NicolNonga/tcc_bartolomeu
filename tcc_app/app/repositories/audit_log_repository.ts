import AuditLog from '#models/audit_log'

export default class AuditLogRepository {
  async registar(dados: Partial<AuditLog>) {
    return AuditLog.create(dados)
  }

  async listar(filtros?: { entidade?: string; userId?: number }) {
    const query = AuditLog.query().preload('user').orderBy('id', 'desc')
    if (filtros?.entidade) query.where('entidade', filtros.entidade)
    if (filtros?.userId) query.where('user_id', filtros.userId)
    return query.limit(200)
  }
}
