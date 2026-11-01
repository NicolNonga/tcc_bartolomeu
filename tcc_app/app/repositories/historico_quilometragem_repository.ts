import HistoricoQuilometragem from '#models/historico_quilometragem'

export default class HistoricoQuilometragemRepository {
  async criar(dados: Partial<HistoricoQuilometragem>) {
    return HistoricoQuilometragem.create(dados)
  }

  async listarPorViatura(viaturaId: number) {
    return HistoricoQuilometragem.query()
      .where('viatura_id', viaturaId)
      .orderBy('data_registo', 'desc')
  }
}
