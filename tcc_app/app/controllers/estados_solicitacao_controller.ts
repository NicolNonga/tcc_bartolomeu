import type { HttpContext } from '@adonisjs/core/http'
import CriarEstadoSolicitacaoService from '#services/estadosSolicitacao/criar_estado_solicitacao_service'
import EstadoSolicitacaoRepository from '#repositories/estado_solicitacao_repository'
import ActualizarEstadoSolicitacaoService from '#services/estadosSolicitacao/actualizar_estado_solicitacao_service'
import RemoverEstadoSolicitacaoService from '#services/estadosSolicitacao/remover_estado_solicitacao_service'
import { criarEstadoSolicitacaoValidator } from '#validators/criar_estado_solicitacao_validator'
import { actualizarEstadoSolicitacaoValidator } from '#validators/actualizar_estado_solicitacao_validator'

export default class EstadosSolicitacaoController {
  /**
   * @store
   * @summary Criar novo estado de solicitação
   * @description Cadastra um novo estado de solicitação no sistema com nome obrigatório, cor e descrição opcionais.
   * @tag EstadosSolicitacao
   * @authenticated
   *
   * @requestBody <criarEstadoSolicitacaoValidator>
   *
   * @responseBody 201 - {
   *   "id": 1,
   *   "nome": "Pendente",
   *   "cor": "#FF0000",
   *   "descricao": "Solicitação aguardando análise",
   *   "created_at": "2026-05-06T10:00:00.000Z",
   *   "updated_at": "2026-05-06T10:00:00.000Z"
   * }
   *
   * @responseBody 422 - {
   *   "errors": [
   *     {
   *       "message": "The nome field must have at least 2 characters",
   *       "rule": "minLength",
   *       "field": "nome"
   *     }
   *   ]
   * }
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(criarEstadoSolicitacaoValidator)
    return new CriarEstadoSolicitacaoService().execute(payload)
  }

  /**
   * @index
   * @summary Listar todos os estados de solicitação
   * @description Retorna uma listagem completa de todos os estados de solicitação cadastrados no sistema.
   * @tag EstadosSolicitacao
   * @authenticated
   *
   * @responseBody 200 - {
   *   "data": [
   *     {
   *       "id": 1,
   *       "nome": "Pendente",
   *       "cor": "#FF0000",
   *       "descricao": "Solicitação aguardando análise"
   *     }
   *   ]
   * }
   */
  async index({ response }: HttpContext) {
    const data = await new EstadoSolicitacaoRepository().listar()
    return response.ok({ data })
  }

  /**
   * @show
   * @summary Buscar estado de solicitação por ID
   * @description Retorna os dados detalhados de um estado de solicitação específico.
   * @tag EstadosSolicitacao
   * @authenticated
   *
   * @paramPath id - ID do estado de solicitação
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Pendente",
   *   "cor": "#FF0000",
   *   "descricao": "Solicitação aguardando análise"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Estado de solicitação não encontrado"
   * }
   */
  async show({ params }: HttpContext) {
    return new EstadoSolicitacaoRepository().buscarPorId(params.id)
  }

  /**
   * @update
   * @summary Actualizar estado de solicitação
   * @description Actualiza as informações de um estado de solicitação previamente cadastrado.
   * @tag EstadosSolicitacao
   * @authenticated
   *
   * @paramPath id - ID do estado de solicitação
   * @requestBody <actualizarEstadoSolicitacaoValidator>
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Pendente Editado",
   *   "cor": "#FF0000",
   *   "descricao": "Solicitação aguardando análise",
   *   "created_at": "2026-05-06T10:00:00.000Z",
   *   "updated_at": "2026-05-06T12:00:00.000Z"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Estado de solicitação não encontrado"
   * }
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(actualizarEstadoSolicitacaoValidator)
    return new ActualizarEstadoSolicitacaoService().execute(params.id, payload)
  }

  /**
   * @destroy
   * @summary Remover estado de solicitação
   * @description Remove permanentemente um estado de solicitação existente no sistema.
   * @tag EstadosSolicitacao
   * @authenticated
   *
   * @paramPath id - ID do estado de solicitação
   *
   * @responseBody 200 - {
   *   "message": "Estado de solicitação removido com sucesso"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Estado de solicitação não encontrado"
   * }
   */
  async destroy({ params, response }: HttpContext) {
    await new RemoverEstadoSolicitacaoService().execute(params.id)
    return response.status(200).send({ message: 'Estado de solicitação removido com sucesso' })
  }
}
