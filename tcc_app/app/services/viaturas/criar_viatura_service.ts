import ViaturaRepository from '#repositories/viatura_repository'

export default class CriarViaturaService {
  constructor(private viaturaRepository = new ViaturaRepository()) {}

  async execute(payload: any) {
    const viatura = await this.viaturaRepository.criar({
      ...payload,
    })

    return viatura
  }
}
