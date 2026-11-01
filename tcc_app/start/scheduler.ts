import cron from 'node-cron'
import app from '@adonisjs/core/services/app'

const CRON_DIARIO = '0 8 * * *'
const DIAS_ANTECEDENCIA = 30

app.ready(() => {
  if (app.getEnvironment() === 'test') return

  cron.schedule(CRON_DIARIO, async () => {
    try {
      const { default: GerarNotificacoesVencimentoService } = await import(
        '#services/alertas/gerar_notificacoes_vencimento_service'
      )
      const resultado = await new GerarNotificacoesVencimentoService().execute(DIAS_ANTECEDENCIA)
      console.log(
        `[scheduler] Vencimentos verificados: ${resultado.criadas} notificações criadas`
      )
    } catch (error) {
      console.error('[scheduler] Erro ao verificar vencimentos:', error)
    }
  })

  console.log(`[scheduler] Verificação de vencimentos agendada (${CRON_DIARIO})`)
})
