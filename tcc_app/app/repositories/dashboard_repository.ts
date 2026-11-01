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
      .where('estado_viatura', 'activo')
      .count('* as total')

    const viaturasManutencao = await db
      .from('viaturas')
      .where('estado_operacional', 'em_manutencao')
      .count('* as total')

    const viaturasActivas = await db
      .from('viaturas')
      .where('estado_viatura', 'activo')
      .count('* as total')

    const totalAbastecimento = await db.from('abastecimentos').sum('valor_total as total')
    const totalManutencao = await db.from('manutencoes').sum('custo as total')

    const atendimentosConcluidos = await db
      .from('atendimento_frontas')
      .where('estado_atendimento', 'concluido')
      .count('* as total')

    const quilometragemFrota = await db.from('viaturas').sum('quilometragem_actual as total')

    const documentosAVencer = await db
      .from('documento_viaturas')
      .whereRaw('data_validade <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)')
      .count('* as total')

    const cartasAExpirar = await db
      .from('condutores')
      .where('is_active', true)
      .whereRaw('validade_carta <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)')
      .count('* as total')

    return {
      total_solicitacoes: Number(totalSolicitacoes[0].total),
      solicitacoes_pendentes: Number(solicitacoesPendentes[0].total),
      viaturas_disponiveis: Number(viaturasDisponiveis[0].total),
      viaturas_manutencao: Number(viaturasManutencao[0].total),
      viaturas_activas: Number(viaturasActivas[0].total),
      total_gasto_abastecimento: Number(totalAbastecimento[0].total || 0),
      total_gasto_manutencao: Number(totalManutencao[0].total || 0),
      custo_total_frota:
        Number(totalAbastecimento[0].total || 0) + Number(totalManutencao[0].total || 0),
      atendimentos_concluidos: Number(atendimentosConcluidos[0].total),
      quilometragem_total_frota: Number(quilometragemFrota[0].total || 0),
      documentos_a_vencer: Number(documentosAVencer[0].total),
      cartas_a_expirar: Number(cartasAExpirar[0].total),
    }
  }

  async custosPorViatura() {
    const abastecimentos = await db
      .from('abastecimentos')
      .join('viaturas', 'abastecimentos.viatura_id', 'viaturas.id')
      .select('viaturas.id', 'viaturas.matricula', 'viaturas.marca', 'viaturas.modelo')
      .sum('abastecimentos.valor_total as custo_combustivel')
      .groupBy('viaturas.id')

    const manutencoes = await db
      .from('manutencoes')
      .join('viaturas', 'manutencoes.viatura_id', 'viaturas.id')
      .select('viaturas.id')
      .sum('manutencoes.custo as custo_manutencao')
      .groupBy('viaturas.id')

    const manutencaoMap = Object.fromEntries(
      manutencoes.map((m) => [m.id, Number(m.custo_manutencao || 0)])
    )

    return abastecimentos.map((v) => ({
      viatura_id: v.id,
      matricula: v.matricula,
      marca: v.marca,
      modelo: v.modelo,
      custo_combustivel: Number(v.custo_combustivel || 0),
      custo_manutencao: manutencaoMap[v.id] || 0,
      custo_total: Number(v.custo_combustivel || 0) + (manutencaoMap[v.id] || 0),
    }))
  }

  async disponibilidadeFrota() {
    const estados = await db
      .from('viaturas')
      .select('estado_operacional')
      .count('* as total')
      .groupBy('estado_operacional')

    return estados
  }
}
