// eslint-disable-next-line unicorn/filename-case
import SolicitacaoRepository from '#repositories/SolicitacaoRepository'
import GerarCodigoSolicitacaoService from './GerarCodigoSolicitacaoService.js'

export default class CriarSolicitacaoService {
  constructor(private repository = new SolicitacaoRepository()) {}

  async execute(payload: any, userId: number) {
    const codigo = await new GerarCodigoSolicitacaoService().execute()

    const dados = {
      ...payload,
      codigo,
      solicitante_id: userId,
      estado_solicitacao_id: 1, // estdo um é pendente depois vamos  mudar e colocar na Env
    }

    return this.repository.criar(dados)
  }
}
