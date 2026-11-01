import DashboardRepository from '#repositories/dashboard_repository'
import ConsumoCombustivelService from '#services/combustivel/consumo_combustivel_service'

export default class DashboardService {
  constructor(
    private repository = new DashboardRepository(),
    private consumoService = new ConsumoCombustivelService()
  ) {}

  async execute() {
    return this.repository.indicadoresGerais()
  }

  async custosPorViatura() {
    return this.repository.custosPorViatura()
  }

  async disponibilidadeFrota() {
    return this.repository.disponibilidadeFrota()
  }

  async consumoMedioFrota() {
    return this.consumoService.consumoMedioFrota()
  }
}
