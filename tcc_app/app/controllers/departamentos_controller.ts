import type { HttpContext } from '@adonisjs/core/http'
import DepartamentoRepository from '#repositories/departamento_repository'
import CriarDepartamentoService from '#services/departamentos/criar_departamento_service'
import ActualizarDepartamentoService from '#services/departamentos/actualizar_departamento_service'
import RemoverDepartamentoService from '#services/departamentos/remover_departamento_service'
import { criarDepartamentoValidator } from '#validators/criar_departamento'
import { actualizarDepartamentoValidator } from '#validators/atualizar_departamento'

export default class DepartamentosController {
  /**
   * @store
   * @summary Criar novo departamento
   * @description Cadastra um novo departamento no sistema com nome obrigatório, sigla e descrição opcionais.
   * @tag Departamentos
   * @authenticated
   *
   * @requestBody <criarDepartamentoValidator>
   *
   * @responseBody 201 - {
   *   "id": 1,
   *   "nome": "Recursos Humanos",
   *   "sigla": "RH",
   *   "descricao": "Departamento responsável pela gestão de pessoas",
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
    const payload = await request.validateUsing(criarDepartamentoValidator)
    return new CriarDepartamentoService().execute(payload)
  }

  /**
   * @index
   * @summary Listar todos os departamentos
   * @description Retorna uma listagem completa de todos os departamentos cadastrados no sistema.
   * @tag Departamentos
   * @authenticated
   *
   * @responseBody 200 - [
   *   {
   *     "id": 1,
   *     "nome": "Recursos Humanos",
   *     "sigla": "RH",
   *     "descricao": "Departamento responsável pela gestão de pessoas"
   *   },
   *   {
   *     "id": 2,
   *     "nome": "Financeiro",
   *     "sigla": "FIN",
   *     "descricao": "Departamento financeiro"
   *   }
   * ]
   */
  async index({ response, request }: HttpContext) {
    const data = await new DepartamentoRepository().listar()
    return response.ok({ data })
  }

  /**
   * @show
   * @summary Buscar departamento por ID
   * @description Retorna os dados detalhados de um departamento específico.
   * @tag Departamentos
   * @authenticated
   *
   * @paramPath id - ID do departamento
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Recursos Humanos",
   *   "sigla": "RH",
   *   "descricao": "Departamento responsável pela gestão de pessoas"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Departamento não encontrado"
   * }
   */
  async show({ params }: HttpContext) {
    return new DepartamentoRepository().buscarPorId(params.id)
  }

  /**
   * @update
   * @summary Actualizar departamento
   * @description Actualiza as informações de um departamento previamente cadastrado.
   * @tag Departamentos
   * @authenticated
   *
   * @paramPath id - ID do departamento
   * @requestBody <actualizarDepartamentoValidator>
   *
   * @responseBody 200 - {
   *   "id": 1,
   *   "nome": "Financeiro",
   *   "sigla": "FIN",
   *   "descricao": "Departamento financeiro actualizado",
   *   "created_at": "2026-05-06T10:00:00.000Z",
   *   "updated_at": "2026-05-06T12:00:00.000Z"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Departamento não encontrado"
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
    const payload = await request.validateUsing(actualizarDepartamentoValidator)
    return new ActualizarDepartamentoService().execute(params.id, payload)
  }

  /**
   * @destroy
   * @summary Remover departamento
   * @description Remove permanentemente um departamento existente no sistema.
   * @tag Departamentos
   * @authenticated
   *
   * @paramPath id - ID do departamento
   *
   * @responseBody 200 - {
   *   "message": "Departamento removido com sucesso"
   * }
   *
   * @responseBody 404 - {
   *   "message": "Departamento não encontrado"
   * }
   */
  async destroy({ params, response }: HttpContext) {
    const data =  new RemoverDepartamentoService().execute(params.id)
    return response.status(200).send({ message: 'Departamento removido com sucesso' })
}
