import type { HttpContext } from '@adonisjs/core/http'
import CriarTipoServicoService from '#services/tiposServicos/criar_tipo_servicos_service'
import TipoServicoRepository from '#repositories/tipo_servico_repository'
import ActualizarTipoServicoService from '#services/tiposServicos/actualizar_tipo_servicos_service'
import RemoverTipoServicoService from '#services/tiposServicos/remover_tipo_servicos_service'
import { criarTipoServicoValidator } from '#validators/criar_tipo_servico'
import { actualizarTipoServicoValidator } from '#validators/actualizar_tipo_servico'

export default class TipoServicoController {
  /**
   * @store
   * @summary Criar novo tipoServico
   * @description Cadastra um novo tipoServico no sistema com nome obrigatório, sigla e descrição opcionais.
   * @tag TipoServicos
   * @authenticated
   *
   * @requestBody <criarTipoServicoValidator>
   *
   * @responseBody 201 - {
   *   "id": 1,
   *   "nome": "Recursos Humanos",
   *   "sigla": "RH",
   *   "descricao": "tipoServico responsável pela gestão de pessoas",
   *   "created_at": "2026-05-06T10:00:00.000Z",
   *   "updated_at": "2026-05-06T10:00:00.000Z"
   * }
   *
   * @responseBody 422 - {
   *   "errors": [
   *     {
   *       "message": "The nome field must have at least 3 characters",
   *       "rule": "minLength",
   *       "field": "nome"
   *     }
   *   ]
   * }
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(criarTipoServicoValidator)
    return new CriarTipoServicoService().execute(payload)
  }

  /**
   * @index
   * @summary Listar todos os tipoServicos
   * @description Retorna uma listagem completa de todos os tipoServicos cadastrados no sistema.
   * @tag TipoServicos
   * @authenticated
   *
   * @responseBody 200 - [
   *   {
   *     "id": 1,
   *     "nome": "Recursos Humanos",
   *     "sigla": "RH",
   *     "descricao": "tipoServico responsável pela gestão de pessoas"
   *   },
   *   {
   *     "id": 2,
   *     "nome": "Financeiro",
   *     "sigla": "FIN",
   *     "descricao": "tipoServico financeiro"
   *   }
   * ]
   */
  async index({ response, request }: HttpContext) {
    const data = await new TipoServicoRepository().listar()
    return response.ok({ data })
  }

  /**
   * @show
   * @summary Buscar tipoServico por ID
   * @description Retorna os dados detalhados de um tipoServico específico.
   * @tag TipoServicos
   * @authenticated
   *
   * @paramPath id - ID do tipoServico
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Recursos Humanos",
   *   "sigla": "RH",
   *   "descricao": "tipoServico responsável pela gestão de pessoas"
   * }
   *
   * @responseBody 404 - {
   *   "message": "tipoServico não encontrado"
   * }
   */
  async show({ params }: HttpContext) {
    return new TipoServicoRepository().buscarPorId(params.id)
  }

  /**
   * @update
   * @summary Actualizar tipoServico
   * @description Actualiza as informações de um tipoServico previamente cadastrado.
   * @tag TipoServicos
   * @authenticated
   *
   * @paramPath id - ID do tipoServico
   * @requestBody <actualizartipoServicoValidator>
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Financeiro",
   *   "sigla": "FIN",
   *   "descricao": "tipoServico financeiro actualizado",
   *   "created_at": "2026-05-06T10:00:00.000Z",
   *   "updated_at": "2026-05-06T12:00:00.000Z"
   * }
   *
   * @responseBody 404 - {
   *   "message": "tipoServico não encontrado"
   * }
   *
   * @responseBody 422 - {
   *   "errors": [
   *     {
   *       "message": "The nome field must have at least 3 characters",
   *       "rule": "minLength",
   *       "field": "nome"
   *     }
   *   ]
   * }
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(actualizarTipoServicoValidator)
    return new ActualizarTipoServicoService().execute(params.id, payload)
  }

  /**
   * @destroy
   * @summary Remover tipoServico
   * @description Remove permanentemente um tipoServico existente no sistema.
   * @tag TipoServicos
   * @authenticated
   *
   * @paramPath id - ID do tipoServico
   *
   * @responseBody 200 - {
   *   "message": "tipoServico removido com sucesso"
   * }
   *
   * @responseBody 404 - {
   *   "message": "tipoServico não encontrado"
   * }
   */
  async destroy({ params, response }: HttpContext) {
    const data = new RemoverTipoServicoService().execute(params.id)
    return response.status(200).send({ message: 'tipoServico removido com sucesso' })
  }
}
