import EstadoSolicitacaoRepository from '#repositories/estado_solicitacao_repository'

export default class RemoverEstadoSolicitacaoService {
  constructor(private repository = new EstadoSolicitacaoRepository()) {}

  async execute(id: number) {
    await this.repository.buscarPorId(id)
    return this.repository.remover(id)
  }
}
