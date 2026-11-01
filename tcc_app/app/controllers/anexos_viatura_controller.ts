import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import AnexoViatura from '#models/anexo_viatura'
import AnexoViaturaRepository from '#repositories/anexo_viatura_repository'
import CriarAnexoViaturaService from '#services/viaturas/criar_anexo_viatura_service'

export default class AnexosViaturaController {
  constructor(
    private readonly repository = new AnexoViaturaRepository(),
    private readonly criarService = new CriarAnexoViaturaService()
  ) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorViatura(params.viaturaId)
    return response.ok({ data })
  }

  async store({ request, response }: HttpContext) {
    const arquivo = request.file('arquivo', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
    })
    if (!arquivo) {
      return response.badRequest({ message: 'Ficheiro em falta (campo "arquivo")' })
    }
    if (!arquivo.isValid) {
      return response.badRequest({
        message: 'Ficheiro inválido: use JPG, PNG, WEBP ou PDF até 10 MB',
        errors: arquivo.errors,
      })
    }
    const payload = {
      viatura_id: Number(request.input('viatura_id')),
      nome: request.input('nome'),
      descricao: request.input('descricao'),
    }
    const data = await this.criarService.execute(payload, arquivo)
    return response.created({ message: 'Anexo registado', data })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Anexo removido' })
  }

  async download({ params, response }: HttpContext) {
    const anexo = await AnexoViatura.find(params.id)
    if (!anexo) return response.notFound({ message: 'Anexo não encontrado' })
    return response.download(app.makePath(anexo.arquivo))
  }
}
