import type { HttpContext } from '@adonisjs/core/http'

import SolicitacaoRepository from '#repositories/SolicitacaoRepository'
import CriarSolicitacaoService from '#services/Solicitacoes/CriarSolicitacaoService'

import {
  criarSolicitacaoValidator,
  solicitacaoValidationMessage,
} from '#validators/criar_solicitacao'
import { actualizarSolicitacaoValidator } from '#validators/actualizar_solicitacao'

import { userValidationMessage } from '#validators/create_user'

export default class SolicitacoesController {
  private solicitacaoRepository = new SolicitacaoRepository()
  private criarSolicitacaoService = new CriarSolicitacaoService()

  /**
   * @store
   * @summary Criar nova solicitação
   * @description Registra uma nova solicitação no sistema com dados do utilizador autenticado.
   * @tag Solicitações
   * @authenticated
   *
   * @requestBody {
   *   "required": true,
   *   "content": {
   *     "application/json": {
   *       "schema": {
   *         "type": "object",
   *         "properties": {
   *           "departamento_id": {
   *             "type": "integer",
   *             "example": 1
   *           },
   *           "tipo_servico_id": {
   *             "type": "integer",
   *             "example": 2
   *           },
   *           "descricao": {
   *             "type": "string",
   *             "example": "Necessidade de transporte para reunião"
   *           },
   *           "data_necessidade": {
   *             "type": "string",
   *             "example": "2026-05-20"
   *           },
   *           "hora_necessidade": {
   *             "type": "string",
   *             "example": "14:00"
   *           },
   *           "local_saida": {
   *             "type": "string",
   *             "example": "Maianga"
   *           },
   *           "local_destino": {
   *             "type": "string",
   *             "example": "Talatona"
   *           },
   *           "prioridade": {
   *             "type": "string",
   *             "enum": ["baixa", "media", "alta", "urgente"],
   *             "example": "alta"
   *           },
   *           "observacao": {
   *             "type": "string",
   *             "example": "Solicitação prioritária"
   *           }
   *         },
   *         "required": [
   *           "departamento_id",
   *           "tipo_servico_id",
   *           "descricao",
   *           "data_necessidade",
   *           "prioridade"
   *         ]
   *       }
   *     }
   *   }
   * }
   *
   * @responseBody 201 - {
   *   "message": "solicitacao registrada com sucesso"
   * }
   *
   * @responseBody 401 - {
   *   "message": "utilizador nao autenticado"
   * }
   *
   * @responseBody 422 - {
   *   "errors": [
   *     {
   *       "message": "The descricao field must have at least 5 characters",
   *       "rule": "minLength",
   *       "field": "descricao"
   *     }
   *   ]
   * }
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user

    if (!user?.id) {
      return response.unauthorized({
        message: 'utilizador nao autenticado',
      })
    }

    const payload = await request.validateUsing(criarSolicitacaoValidator, {
      messagesProvider: solicitacaoValidationMessage,
    })

    await this.criarSolicitacaoService.execute(payload, user.id)

    return response.created({
      message: 'solicitacao registrada com sucesso',
    })
  }

  /**
   * @index
   * @summary Listar solicitações
   * @description Retorna todas as solicitações cadastradas no sistema.
   * @tag Solicitações
   * @authenticated
   *
   * @responseBody 200 - [
   *   {
   *     "id": 1,
   *     "descricao": "Pedido de transporte",
   *     "prioridade": "alta",
   *     "estado_solicitacao_id": 1,
   *     "created_at": "2026-05-17T10:00:00.000Z"
   *   }
   * ]
   */
  async index({ response }: HttpContext) {
    const data = await this.solicitacaoRepository.listar()
    return response.ok({ data: data })
  }

  /**
   * @minhas
   * @summary Listar minhas solicitações
   * @description Retorna solicitações pertencentes ao utilizador autenticado.
   * @tag Solicitações
   * @authenticated
   *
   * @responseBody 200 - [
   *   {
   *     "id": 1,
   *     "descricao": "Viagem institucional",
   *     "prioridade": "media",
   *     "estado_solicitacao_id": 1
   *   }
   * ]
   */
  async minhas({ auth }: HttpContext) {
    return this.solicitacaoRepository.listarPorSolicitante(auth.user!.id)
  }

  /**
   * @show
   * @summary Buscar solicitação por ID
   * @description Retorna detalhes de uma solicitação específica.
   * @tag Solicitações
   * @authenticated
   *
   * @paramPath id - ID da solicitação
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "descricao": "Necessidade de deslocação",
   *   "prioridade": "urgente",
   *   "observacao": "urgente aprovação"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Solicitação não encontrada"
   * }
   */
  async show({ params }: HttpContext) {
    return this.solicitacaoRepository.buscarPorId(params.id)
  }

  /**
   * @update
   * @summary Actualizar solicitação
   * @description Actualiza estado ou observação de uma solicitação existente.
   * @tag Solicitações
   * @authenticated
   *
   * @paramPath id - ID da solicitação
   *
   * @requestBody <actualizarSolicitacaoValidator>
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "estado_solicitacao_id": 2,
   *   "observacao": "Aprovada pelo gestor"
   * }
   *
   * @responseBody 422 - {
   *   "errors": [
   *     {
   *       "message": "The estado_solicitacao_id field must be a number",
   *       "rule": "number",
   *       "field": "estado_solicitacao_id"
   *     }
   *   ]
   * }
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(actualizarSolicitacaoValidator)

    return this.solicitacaoRepository.actualizar(params.id, payload)
  }
}
