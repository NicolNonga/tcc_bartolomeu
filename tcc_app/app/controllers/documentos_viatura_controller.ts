import type { HttpContext } from '@adonisjs/core/http'
import DocumentoViaturaRepository from '#repositories/documento_viatura_repository'
import {
  criarDocumentoViaturaValidator,
  actualizarDocumentoViaturaValidator,
} from '#validators/documento_viatura_validator'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import DocumentoViatura from '#models/documento_viatura'

export default class DocumentosViaturaController {
  constructor(private readonly repository = new DocumentoViaturaRepository()) {}

  async index({ params, response }: HttpContext) {
    const data = await this.repository.listarPorViatura(params.viaturaId)
    return response.ok({ data })
  }

  async download({ params, response }: HttpContext) {
    const documento = await DocumentoViatura.query()
      .where('ficheiro', 'like', `%${params.filename}`)
      .firstOrFail()

    if (!documento.ficheiro) {
      return response.notFound({
        message: 'Ficheiro não encontrado',
      })
    }

    const caminho = app.makePath(documento.ficheiro)

    return response.download(caminho)
  }
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(criarDocumentoViaturaValidator)

    const ficheiro = request.file('anexo', {
      size: '10mb',
      extnames: ['pdf', 'jpg', 'jpeg', 'png'],
    })

    let caminho: string | null = null

    if (ficheiro) {
      if (!ficheiro.isValid) {
        return response.badRequest({
          message: 'Ficheiro inválido',
          errors: ficheiro.errors,
        })
      }

      const nome = `${cuid()}.${ficheiro.extname}`

      await ficheiro.move(app.makePath('storage/uploads/documentos_viaturas'), {
        name: nome,
        overwrite: false,
      })

      caminho = `storage/uploads/documentos_viaturas/${nome}`
    }

    const documento = await this.repository.criar({
      viaturaId: payload.viatura_id,
      tipoDocumento: payload.tipo_documento as any,
      numeroDocumento: payload.numero_documento || null,
      entidadeEmissora: payload.entidade_emissora || null,
      dataEmissao: payload.data_emissao as any,
      dataValidade: payload.data_validade as any,
      observacao: payload.observacao || null,
      ficheiro: caminho,
    })

    return response.created({
      message: 'Documento registado',
      data: documento,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(actualizarDocumentoViaturaValidator)

    // Permite anexar (ou substituir) o ficheiro de um documento já registado.
    const ficheiro = request.file('anexo', {
      size: '10mb',
      extnames: ['pdf', 'jpg', 'jpeg', 'png'],
    })
    let caminho: string | undefined
    if (ficheiro) {
      if (!ficheiro.isValid) {
        return response.badRequest({ message: 'Ficheiro inválido', errors: ficheiro.errors })
      }
      const nome = `${cuid()}.${ficheiro.extname}`
      await ficheiro.move(app.makePath('storage/uploads/documentos_viaturas'), {
        name: nome,
        overwrite: false,
      })
      caminho = `storage/uploads/documentos_viaturas/${nome}`
    }

    const documento = await this.repository.actualizar(params.id, {
      tipoDocumento: payload.tipo_documento as any,
      numeroDocumento: payload.numero_documento,
      entidadeEmissora: payload.entidade_emissora,
      dataEmissao: payload.data_emissao as any,
      dataValidade: payload.data_validade as any,
      observacao: payload.observacao,
      ...(caminho ? { ficheiro: caminho } : {}),
    })
    return response.ok({ data: documento })
  }

  async destroy({ params, response }: HttpContext) {
    await this.repository.remover(params.id)
    return response.ok({ message: 'Documento removido' })
  }
}
