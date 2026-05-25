import app from '@adonisjs/core/services/app'
import DocumentoSolicitacaoRepository from '#repositories/documento_solicitacao_repository'

export default class CriarDocumentoSolicitacaoService {
  constructor(private repository = new DocumentoSolicitacaoRepository()) {}

  async execute(payload: any, arquivo: any) {
    const nomeArquivo = `${Date.now()}-${arquivo.clientName}`

    await arquivo.move(app.makePath('storage/uploads'), {
      name: nomeArquivo,
    })

    return this.repository.criar({
      solicitacaoId: payload.solicitacao_id,
      nomeDocumento: payload.nome_documento,
      arquivo: `storage/uploads/${nomeArquivo}`,
      tipoArquivo: arquivo.extname,
      tamanho: String(arquivo.size),
      descricao: payload.descricao,
    })
  }
}
