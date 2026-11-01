import AnexoViatura from '#models/anexo_viatura'

export default class AnexoViaturaRepository {
  async criar(dados: Partial<AnexoViatura>) {
    return AnexoViatura.create(dados)
  }

  async listarPorViatura(viaturaId: number) {
    return AnexoViatura.query().where('viatura_id', viaturaId).orderBy('id', 'desc')
  }

  async remover(id: number) {
    const anexo = await AnexoViatura.find(id)
    if (!anexo) throw new Error('Anexo não encontrado')
    await anexo.delete()
  }
}
