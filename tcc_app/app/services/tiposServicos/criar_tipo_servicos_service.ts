import TipoServico from '#models/tipo_servico'
import TipoServicoRepository from '#repositories/tipo_servico_repository'

export default class CriarTipoServicoService {
  constructor(private repository = new TipoServicoRepository()) {}

  async execute(payload: any) {
    const existe = await this.repository.listar()

    const nomeExiste = existe.find(
      (item: TipoServico) => item.nome.toLowerCase() === payload.nome.toLowerCase()
    )

    if (nomeExiste) {
      throw new Error('Já existe um departamento com este nome')
    }

    return this.repository.criar(payload)
  }
}
