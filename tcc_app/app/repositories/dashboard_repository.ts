import db from '@adonisjs/lucid/services/db'

export default class DashboardRepository {
  async indicadoresGerais() {
    const totalSolicitacoes = await db.from('solicitacoes').count('* as total')
    const solicitacoesPendentes = await db
      .from('solicitacoes')
      .where('estado_solicitacao_id', 1)
      .count('* as total')

    const viaturasDisponiveis = await db
      .from('viaturas')
      .where('estado_operacional', 'disponivel')
      .count('* as total')

    const viaturasManutencao = await db
      .from('viaturas')
      .where('estado_operacional', 'em_manutencao')
      .count('* as total')

    const totalAbastecimento = await db.from('abastecimentos').sum('valor_total as total')
    const totalManutencao = await db.from('manutencoes').sum('custo as total')

    const atendimentosConcluidos = await db
      .from('atendimento_frontas')
      .where('estado_atendimento', 'concluido')
      .count('* as total')

    const quilometragemFrota = await db.from('viaturas').sum('quilometragem_actual as total')

    return {
      total_solicitacoes: Number(totalSolicitacoes[0].total),
      solicitacoes_pendentes: Number(solicitacoesPendentes[0].total),
      viaturas_disponiveis: Number(viaturasDisponiveis[0].total),
      viaturas_manutencao: Number(viaturasManutencao[0].total),
      total_gasto_abastecimento: Number(totalAbastecimento[0].total || 0),
      total_gasto_manutencao: Number(totalManutencao[0].total || 0),
      atendimentos_concluidos: Number(atendimentosConcluidos[0].total),
      quilometragem_total_frota: Number(quilometragemFrota[0].total || 0),
    }
  }
}
