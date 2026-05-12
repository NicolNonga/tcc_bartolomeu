import TipoServicoRepository from '#repositories/tipo_servico_repository'
export default class RemoverTipoServicoService {
  constructor(private repository = new TipoServicoRepository()) {}

  async execute(id: number) {
    await this.repository.buscarPorId(id)
    return this.repository.remover(id)
  }
}
