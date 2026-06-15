import db from '@adonisjs/lucid/services/db'

export default class RelatorioGeralRepository {
  async solicitacoesPorMes() {
    return await db
      .from('solicitacoes')
      .select(db.raw('MONTH(created_at) as mes'))
      .count('* as total')
      .groupByRaw('MONTH(created_at)')
      .orderBy('mes')
  }

  async abastecimentoPorMes() {
    return await db
      .from('abastecimentos')
      .select(db.raw('MONTH(data_abastecimento) as mes'))
      .sum('valor_total as total')
      .groupByRaw('MONTH(data_abastecimento)')
      .orderBy('mes')
  }

  async manutencaoPorViatura() {
    return db
      .from('manutencoes')
      .join('viaturas', 'manutencoes.viatura_id', 'viaturas.id')
      .select('viaturas.matricula', 'viaturas.marca', 'viaturas.modelo')
      .sum('manutencoes.custo as total_custo')
      .groupBy('viaturas.id')
      .orderBy('total_custo', 'desc')
  }

  async viaturasMaisUtilizadas() {
    return db
      .from('atendimento_frontas')
      .join('viaturas', 'atendimento_frontas.viatura_id', 'viaturas.id')
      .select('viaturas.matricula', 'viaturas.marca', 'viaturas.modelo')
      .count('atendimento_frontas.id as total_atendimentos')
      .groupBy('viaturas.id')
      .orderBy('total_atendimentos', 'desc')
  }
}
