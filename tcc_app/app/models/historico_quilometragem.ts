import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'

export default class HistoricoQuilometragem extends BaseModel {
  static table = 'historico_quilometragens'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare quilometragem: number

  @column.date()
  declare dataRegisto: DateTime

  @column()
  declare origem: string

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>
}
