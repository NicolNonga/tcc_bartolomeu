import AlertaRepository from '#repositories/alerta_repository'

export default class AlertaService {
  constructor(private repository = new AlertaRepository()) {}

  async execute(dias = 30) {
    return this.repository.todos(dias)
  }
}
