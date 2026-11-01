import ManutencaoAgendamento from '#models/manutencao_agendamento'

export default class ManutencaoAgendamentoRepository {
  async criar(dados: Partial<ManutencaoAgendamento>) {
    return ManutencaoAgendamento.create(dados)
  }

  async listar(filtros?: { viaturaId?: number; concluido?: boolean }) {
    const query = ManutencaoAgendamento.query().preload('viatura').orderBy('id', 'desc')
    if (filtros?.viaturaId) query.where('viatura_id', filtros.viaturaId)
    if (filtros?.concluido !== undefined) query.where('concluido', filtros.concluido)
    return query
  }

  async buscarPorId(id: number) {
    return ManutencaoAgendamento.query().where('id', id).preload('viatura').first()
  }

  async actualizar(id: number, dados: Partial<ManutencaoAgendamento>) {
    const agendamento = await ManutencaoAgendamento.findOrFail(id)
    agendamento.merge(dados)
    await agendamento.save()
    return agendamento
  }

  async agendamentosPendentes() {
    return ManutencaoAgendamento.query()
      .where('concluido', false)
      .preload('viatura')
      .orderBy('data_alvo')
  }
}
