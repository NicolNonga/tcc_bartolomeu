import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'
import Condutor from './condutor.js'

export default class CartaoCombustivel extends BaseModel {
  static table = 'cartoes_combustivel'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numeroCartao: string

  @column()
  declare fornecedor: string | null

  @column()
  declare viaturaId: number | null

  @column()
  declare condutorId: number | null

  @column()
  declare limiteMensal: number | null

  @column()
  declare isActive: boolean

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>

  @belongsTo(() => Condutor)
  declare condutor: BelongsTo<typeof Condutor>
}
