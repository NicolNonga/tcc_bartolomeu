import ViaturaRepository from '#repositories/viatura_repository'

export default class ListarViaturaService {
  constructor(private viaturaRepository = new ViaturaRepository()) {}

  async execute(payload?: any) {
    return await this.viaturaRepository.listar()
  }
}
