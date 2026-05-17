import Solicitacao from '#models/solicitacao'

export default class GerarCodigoSolicitacaoService {
  async execute() {
    const total = await Solicitacao.query().count('* as total')
    const numero = Number(total[0].$extras.total) + 1
    const ano = new Date().getFullYear()

    return `SOL-${ano}-${String(numero).padStart(4, '0')}`
  }
}
