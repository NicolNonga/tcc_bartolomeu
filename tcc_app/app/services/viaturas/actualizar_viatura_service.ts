import ViaturaRepository from '#repositories/viatura_repository'
import HistoricoQuilometragemRepository from '#repositories/historico_quilometragem_repository'

export default class ActualizarViaturaService {
  constructor(
    private viaturaRepository = new ViaturaRepository(),
    private historicoRepository = new HistoricoQuilometragemRepository()
  ) {}

  async execute(id: number, payload: Record<string, unknown>) {
    const viaturaAnterior = await this.viaturaRepository.buscarPorId(id)
    const viatura = await this.viaturaRepository.actualizar(id, payload as any)

    if (
      payload.quilometragem_actual &&
      viaturaAnterior &&
      payload.quilometragem_actual !== viaturaAnterior.quilometragemActual
    ) {
      await this.historicoRepository.criar({
        viaturaId: id,
        quilometragem: payload.quilometragem_actual as number,
        dataRegisto: new Date().toISOString().split('T')[0] as any,
        origem: 'actualizacao',
      })
    }

    return viatura
  }
}
