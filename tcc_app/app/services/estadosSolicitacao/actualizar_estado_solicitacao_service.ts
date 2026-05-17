import EstadoSolicitacaoRepository from '#repositories/estado_solicitacao_repository'

export default class ActualizarEstadoSolicitacaoService {
  constructor(private repository = new EstadoSolicitacaoRepository()) {}

  async execute(id: number, payload: any) {
    await this.repository.buscarPorId(id)
    return this.repository.actualizar(id, payload)
  }
}
