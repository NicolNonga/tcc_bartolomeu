import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Condutor from './condutor.js'
import Viatura from './viatura.js'
import { TipoInfraccao } from '../enum/condutor_enum.js'

export default class InfraccaoCondutor extends BaseModel {
  static table = 'infracoes_condutor'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare condutorId: number

  @column()
  declare viaturaId: number | null

  @column.date()
  declare dataInfraccao: DateTime

  @column()
  declare local: string | null

  @column()
  declare descricao: string

  @column()
  declare gravidade: TipoInfraccao

  @column()
  declare valorMulta: number | null

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Condutor)
  declare condutor: BelongsTo<typeof Condutor>

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>
}
