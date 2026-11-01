import type { HttpContext } from '@adonisjs/core/http'
import ManutencaoAgendamentoRepository from '#repositories/manutencao_agendamento_repository'
import { criarManutencaoAgendamentoValidator } from '#validators/manutencao_extra_validator'

export default class ManutencaoAgendamentosController {
  constructor(private readonly repository = new ManutencaoAgendamentoRepository()) {}

  async index({ request, response }: HttpContext) {
    const data = await this.repository.listar({
      viaturaId: request.input('viatura_id'),
      concluido:
        request.input('concluido') !== undefined ? request.input('concluido') === 'true' : undefined,
    })
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarManutencaoAgendamentoValidator)
    const agendamento = await this.repository.criar({
      viaturaId: payload.viatura_id,
      descricao: payload.descricao,
      tipoAgendamento: payload.tipo_agendamento,
      quilometragemAlvo: payload.quilometragem_alvo || null,
      dataAlvo: payload.data_alvo as any,
      observacao: payload.observacao || null,
    })
    return response.created({ message: 'Agendamento criado', data: agendamento })
  }

  async update({ params, request, response }: HttpContext) {
    const agendamento = await this.repository.actualizar(params.id, request.body())
    return response.ok({ data: agendamento })
  }
}
