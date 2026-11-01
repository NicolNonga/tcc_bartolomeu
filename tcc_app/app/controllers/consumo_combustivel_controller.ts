import type { HttpContext } from '@adonisjs/core/http'
import ConsumoCombustivelService from '#services/combustivel/consumo_combustivel_service'
import AbastecimentoRepository from '#repositories/abastecimento_repository'

export default class ConsumoCombustivelController {
  constructor(
    private readonly consumoService = new ConsumoCombustivelService(),
    private readonly abastecimentoRepository = new AbastecimentoRepository()
  ) {}

  async porViatura({ params, response }: HttpContext) {
    const data = await this.consumoService.calcularPorViatura(params.viaturaId)
    return response.ok({ data })
  }

  async frota({ response }: HttpContext) {
    const data = await this.consumoService.consumoMedioFrota()
    return response.ok({ data })
  }

  async relatorioCustos({ request, response }: HttpContext) {
    const data = await this.abastecimentoRepository.relatorioCustos({
      viaturaId: request.input('viatura_id'),
      condutorId: request.input('condutor_id'),
      dataInicio: request.input('data_inicio'),
      dataFim: request.input('data_fim'),
    })
    return response.ok({ data })
  }
}
