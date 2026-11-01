import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Manutencao from './manutencao.js'

export default class ManutencaoPeca extends BaseModel {
  static table = 'manutencao_pecas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare manutencaoId: number

  @column()
  declare nomePeca: string

  @column()
  declare quantidade: number

  @column()
  declare custoUnitario: number

  @column()
  declare custoTotal: number

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Manutencao)
  declare manutencao: BelongsTo<typeof Manutencao>
}
