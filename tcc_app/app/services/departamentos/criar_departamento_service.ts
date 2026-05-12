import Departamento from '#models/departamento'
import DepartamentoRepository from '../../repositories/departamento_repository.js'

export default class CriarDepartamentoService {
  constructor(private repository = new DepartamentoRepository()) {}

  async execute(payload: any) {
    const existe = await this.repository.listar()

    const nomeExiste = existe.find(
      (item: Departamento) => item.nome.toLowerCase() === payload.nome.toLowerCase()
    )

    if (nomeExiste) {
      throw new Error('Já existe um departamento com este nome')
    }

    return this.repository.criar(payload)
  }
}
