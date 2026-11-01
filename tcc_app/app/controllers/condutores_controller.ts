import type { HttpContext } from '@adonisjs/core/http'
import CondutorRepository from '#repositories/condutor_repository'
import { criarCondutorValidator, actualizarCondutorValidator } from '#validators/condutor_validator'

export default class CondutoresController {
  constructor(private readonly repository = new CondutorRepository()) {}

  async index({ response }: HttpContext) {
    const data = await this.repository.listar()
    return response.ok({ data })
  }

  async show({ params, response }: HttpContext) {
    const condutor = await this.repository.buscarPorId(params.id)
    if (!condutor) return response.notFound({ message: 'Condutor não encontrado' })
    return response.ok({ data: condutor })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarCondutorValidator)
    console.log(payload)
    const condutor = await this.repository.criar({
      userId: payload.user_id || null,
      numeroCarta: payload.numero_carta,
      categoriaCarta: payload.categoria_carta as any,
      validadeCarta: payload.validade_carta as any,
      telefone: payload.telefone || null,
      dataNascimento: payload.data_nascimento as any,
      morada: payload.morada || null,
      observacao: payload.observacao || null,
    })
    return response.created({ message: 'Condutor registado com sucesso', data: condutor })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(actualizarCondutorValidator)
    const condutor = await this.repository.actualizar(params.id, {
      userId: payload.user_id,
      numeroCarta: payload.numero_carta,
      categoriaCarta: payload.categoria_carta as any,
      validadeCarta: payload.validade_carta as any,
      telefone: payload.telefone,
      dataNascimento: payload.data_nascimento as any,
      morada: payload.morada,
      observacao: payload.observacao,
      isActive: payload.is_active,
    })
    return response.ok({ message: 'Condutor actualizado', data: condutor })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Condutor removido com sucesso' })
  }

  async historicoViaturas({ params, response }: HttpContext) {
    const data = await this.repository.historicoViaturas(params.id)
    return response.ok({ data })
  }
}
