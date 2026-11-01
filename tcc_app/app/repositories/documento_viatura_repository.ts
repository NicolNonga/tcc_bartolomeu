import DocumentoViatura from '#models/documento_viatura'

export default class DocumentoViaturaRepository {
  async criar(dados: Partial<DocumentoViatura>) {
    return DocumentoViatura.create(dados)
  }

  async listarPorViatura(viaturaId: number) {
    return DocumentoViatura.query().where('viatura_id', viaturaId).orderBy('data_validade')
  }

  async buscarPorId(id: number) {
    return DocumentoViatura.find(id)
  }

  async actualizar(id: number, dados: Partial<DocumentoViatura>) {
    const documento = await DocumentoViatura.findOrFail(id)
    documento.merge(dados)
    await documento.save()
    return documento
  }

  async remover(id: number) {
    const documento = await DocumentoViatura.find(id)
    if (!documento) throw new Error('Documento não encontrado')
    await documento.delete()
  }

  async documentosAExpirar(dias = 30) {
    const limite = new Date()
    limite.setDate(limite.getDate() + dias)
    return DocumentoViatura.query()
      .where('data_validade', '<=', limite.toISOString().split('T')[0])
      .preload('viatura')
      .orderBy('data_validade')
  }
}
