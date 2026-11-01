import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'

export default class AnexoViatura extends BaseModel {
  static table = 'anexo_viaturas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare nome: string

  @column()
  declare arquivo: string

  @column()
  declare tipoArquivo: string | null

  @column()
  declare tamanho: string | null

  @column()
  declare descricao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>
}
