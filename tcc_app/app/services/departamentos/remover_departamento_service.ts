import DepartamentoRepository from '../../repositories/departamento_repository.js'

export default class RemoverDepartamentoService {
  constructor(private repository = new DepartamentoRepository()) {}

  async execute(id: number) {
    await this.repository.buscarPorId(id)
    return this.repository.remover(id)
  }
}
