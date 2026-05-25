import DocumentoSolicitacao from '#models/documento_solicitacao'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class DocumentoSolicitacaoRepository {
  async criar(dados: Partial<DocumentoSolicitacao>, trx?: TransactionClientContract) {
    return DocumentoSolicitacao.create(dados, trx ? { client: trx } : undefined)
  }

  async listarPorSolicitacao(solicitacaoId: number) {
    return DocumentoSolicitacao.query().where('solicitacao_id', solicitacaoId).orderBy('id', 'desc')
  }

  async remover(id: number) {
    const documento = await DocumentoSolicitacao.findOrFail(id)
    await documento.delete()
  }
}
