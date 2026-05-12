import DepartamentoRepository from '../../repositories/departamento_repository.js'

export default class ActualizarDepartamentoService {
  constructor(private repository = new DepartamentoRepository()) {}

  async execute(id: number, payload: any) {
    await this.repository.buscarPorId(id)
    return this.repository.actualizar(id, payload)
  }
}
