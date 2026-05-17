import EstadoSolicitacao from '#models/estado_solicitacao'

export default class EstadoSolicitacaoRepository {
  async criar(dados: Partial<EstadoSolicitacao>) {
    return EstadoSolicitacao.create(dados)
  }

  async listar() {
    return EstadoSolicitacao.query().orderBy('id', 'desc')
  }

  async buscarPorId(id: number) {
    return EstadoSolicitacao.find(id)
  }

  async actualizar(id: number, dados: Partial<EstadoSolicitacao>) {
    const estadoSolicitacao = await EstadoSolicitacao.findOrFail(id)
    estadoSolicitacao.merge(dados)
    await estadoSolicitacao.save()

    return estadoSolicitacao
  }

  async remover(id: number) {
    const estadoSolicitacao = await EstadoSolicitacao.find(id)
    if (!estadoSolicitacao) {
      throw new Error('Estado de solicitação não encontrado')
    }
    await estadoSolicitacao.delete()
  }
}
