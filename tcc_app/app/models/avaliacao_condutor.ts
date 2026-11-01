import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Condutor from './condutor.js'
import User from './user.js'

export default class AvaliacaoCondutor extends BaseModel {
  static table = 'avaliacoes_condutor'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare condutorId: number

  @column()
  declare avaliadorId: number | null

  @column.date()
  declare dataAvaliacao: DateTime

  @column()
  declare pontuacao: number

  @column()
  declare comentario: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Condutor)
  declare condutor: BelongsTo<typeof Condutor>

  @belongsTo(() => User, { foreignKey: 'avaliadorId' })
  declare avaliador: BelongsTo<typeof User>
}
