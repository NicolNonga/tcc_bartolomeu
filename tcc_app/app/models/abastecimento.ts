import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from '#models/viatura'
import Condutor from '#models/condutor'
import CartaoCombustivel from '#models/cartao_combustivel'

export default class Abastecimento extends BaseModel {
  static table = 'abastecimentos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare condutorId: number | null

  @column()
  declare cartaoCombustivelId: number | null

  @column.date()
  declare dataAbastecimento: DateTime

  @column()
  declare tipoCombustivel: 'gasolina' | 'diesel' | 'electrico' | 'hibrido'

  @column()
  declare quantidadeLitros: number

  @column()
  declare valorTotal: number

  @column()
  declare quilometragemRegistrada: number | null

  @column()
  declare postoAbastecimento: string | null

  @column()
  declare observacao: string | null

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>

  @belongsTo(() => Condutor)
  declare condutor: BelongsTo<typeof Condutor>

  @belongsTo(() => CartaoCombustivel)
  declare cartaoCombustivel: BelongsTo<typeof CartaoCombustivel>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
