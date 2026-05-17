import EstadoSolicitacao from '#models/estado_solicitacao'
import EstadoSolicitacaoRepository from '#repositories/estado_solicitacao_repository'

export default class CriarEstadoSolicitacaoService {
  constructor(private repository = new EstadoSolicitacaoRepository()) {}

  async execute(payload: any) {
    const existe = await this.repository.listar()

    const nomeExiste = existe.find(
      (item: EstadoSolicitacao) => item.nome.toLowerCase() === payload.nome.toLowerCase()
    )

    if (nomeExiste) {
      throw new Error('Já existe um estado de solicitação com este nome')
    }

    return this.repository.criar(payload)
  }
}
