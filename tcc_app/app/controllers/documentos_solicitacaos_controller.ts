import type { HttpContext } from '@adonisjs/core/http'
import DocumentoSolicitacaoRepository from '#repositories/documento_solicitacao_repository'
import CriarDocumentoSolicitacaoService from '#services/documentoSolicitacao/cirar_documento_solicitacao_service'
import {
  criarDocumentoSolicitacaoValidationMessage,
  criarDocumentoSolicitacaoValidator,
} from '#validators/criar_documento_solicitacao_validator'

export default class DocumentosSolicitacaoController {
  constructor(
    private readonly repository = new DocumentoSolicitacaoRepository(),
    private readonly criarDocumentoSolicitacaoService = new CriarDocumentoSolicitacaoService()
  ) {}
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarDocumentoSolicitacaoValidator, {
      messagesProvider: criarDocumentoSolicitacaoValidationMessage,
    })
    const arquivo = request.file('arquivo')!

    const data = this.criarDocumentoSolicitacaoService.execute(payload, arquivo)

    return response.created({
      message: 'documento registrado com sucesso',
      data,
    })
  }

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorSolicitacao(params.solicitacaoId)
    return response.json({ data: data })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.json({ message: 'documento removido com sucesso' })
  }
}
