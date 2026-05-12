import TipoServicoRepository from '#repositories/tipo_servico_repository'

export default class ActualizarTipoServicoService {
  constructor(private repository = new TipoServicoRepository()) {}

  async execute(id: number, payload: any) {
    await this.repository.buscarPorId(id)
    return this.repository.actualizar(id, payload)
  }
}
