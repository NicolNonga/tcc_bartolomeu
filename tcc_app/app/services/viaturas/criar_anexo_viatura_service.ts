import app from '@adonisjs/core/services/app'
import AnexoViaturaRepository from '#repositories/anexo_viatura_repository'

export default class CriarAnexoViaturaService {
  constructor(private repository = new AnexoViaturaRepository()) {}

  async execute(payload: { viatura_id: number; nome: string; descricao?: string }, arquivo: any) {
    const nomeArquivo = `${Date.now()}-${arquivo.clientName}`

    await arquivo.move(app.makePath('storage/uploads'), {
      name: nomeArquivo,
    })

    return this.repository.criar({
      viaturaId: payload.viatura_id,
      nome: payload.nome,
      arquivo: `storage/uploads/${nomeArquivo}`,
      tipoArquivo: arquivo.extname,
      tamanho: String(arquivo.size),
      descricao: payload.descricao || null,
    })
  }
}
