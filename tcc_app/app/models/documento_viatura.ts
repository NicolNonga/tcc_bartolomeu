import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, computed } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'
import { TipoDocumentoViatura } from '../enum/viatura_enum.js'
import env from '#start/env'

export default class DocumentoViatura extends BaseModel {
  static table = 'documento_viaturas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare tipoDocumento: TipoDocumentoViatura

  @column()
  declare numeroDocumento: string | null

  @column()
  declare entidadeEmissora: string | null

  @column.date()
  declare dataEmissao: DateTime | null

  @column.date()
  declare dataValidade: DateTime

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare ficheiro: string | null
  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>

  @computed()
  get url() {
    if (!this.ficheiro) {
      return null
    }

    const baseUrl = env.get('APP_URL')

    const nomeFicheiro = this.ficheiro.split('/').pop()

    return `${baseUrl}/documentos-viatura/documento/${nomeFicheiro}`
  }
}
