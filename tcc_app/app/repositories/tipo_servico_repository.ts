import TipoServico from '#models/tipo_servico'

export default class TipoServicoRepository {
  async criar(dados: Partial<TipoServico>) {
    return TipoServico.create(dados)
  }

  async listar() {
    return TipoServico.query().orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return TipoServico.find(id)
  }

  async actualizar(id: number, dados: Partial<TipoServico>) {
    const tipoServico = await TipoServico.findOrFail(id)
    tipoServico.merge(dados)
    await tipoServico.save()

    return TipoServico
  }

  async remover(id: number) {
    const tipoServico = await TipoServico.find(id)
    if (!tipoServico) {
      throw new Error('TipoServico não encontrado')
    }
    await tipoServico.delete()
  }
}
