import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import GerarNotificacoesVencimentoService from '#services/alertas/gerar_notificacoes_vencimento_service'

export default class VerificarVencimentos extends BaseCommand {
  static commandName = 'alertas:verificar-vencimentos'
  static description =
    'Gera notificações e envia emails para documentos, cartas e manutenções a vencer'

  static options: CommandOptions = {
    startApp: true,
  }

  @flags.number({ description: 'Dias de antecedência para alertas', default: 30 })
  declare dias: number

  async run() {
    const resultado = await new GerarNotificacoesVencimentoService().execute(this.dias)

    this.logger.info(
      `Notificações criadas: ${resultado.criadas} | Documentos: ${resultado.documentos} | Cartas: ${resultado.cartas} | Manutenções: ${resultado.agendamentos} | Emails: ${resultado.emails_enviados}`
    )
  }
}
