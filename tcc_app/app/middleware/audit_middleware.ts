import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import AuditLogService from '#services/auditoria/audit_log_service'

const ACCOES: Record<string, string> = {
  POST: 'criar',
  PUT: 'actualizar',
  PATCH: 'actualizar',
  DELETE: 'remover',
}

const CAMPOS_SENSIVEIS = ['password', 'password_confirmation', 'senha', 'token']
const ENTIDADES_IGNORADAS = ['audit-logs', 'notificacoes', 'auth']

/**
 * Regista no audit_logs toda a operação de escrita (POST/PUT/PATCH/DELETE)
 * concluída com sucesso por um utilizador autenticado.
 * Nunca interrompe o pedido: qualquer falha ao registar é ignorada.
 */
export default class AuditMiddleware {
  constructor(private auditLogService = new AuditLogService()) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const output = await next()

    try {
      const accao = ACCOES[ctx.request.method()]
      const status = ctx.response.getStatus()
      const user = ctx.auth?.user
      if (!accao || status >= 400 || !user) return output

      const segmentos = ctx.request.url().split('?')[0].split('/').filter(Boolean)
      const entidade = segmentos[0] === 'api' ? segmentos[1] : segmentos[0]
      if (!entidade || ENTIDADES_IGNORADAS.includes(entidade)) return output

      const idNoPath = segmentos.find((s) => /^\d+$/.test(s))
      const corpo = ctx.response.getBody() as { data?: { id?: number } } | undefined
      const entidadeId = idNoPath ? Number(idNoPath) : (corpo?.data?.id ?? null)

      const dados: Record<string, unknown> = { ...ctx.request.body() }
      for (const campo of CAMPOS_SENSIVEIS) delete dados[campo]

      await this.auditLogService.registar({
        userId: user.id,
        accao,
        entidade,
        entidadeId: entidadeId ?? undefined,
        dadosNovos: Object.keys(dados).length ? (JSON.stringify(dados) as any) : undefined,
        ip: ctx.request.ip(),
      })
    } catch {
      // a auditoria não pode quebrar a operação
    }

    return output
  }
}
