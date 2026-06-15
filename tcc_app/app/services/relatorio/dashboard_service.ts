import DashboardRepository from '#repositories/dashboard_repository'

export default class DashboardService {
  constructor(private repository = new DashboardRepository()) {}

  async execute() {
    return this.repository.indicadoresGerais()
  }
}
