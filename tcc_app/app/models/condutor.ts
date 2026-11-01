import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import InfraccaoCondutor from './infraccao_condutor.js'
import AvaliacaoCondutor from './avaliacao_condutor.js'
import { CategoriaCarta } from '../enum/condutor_enum.js'
import Viatura from './viatura.js'

export default class Condutor extends BaseModel {
  static table = 'condutores'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare numeroCarta: string

  @column()
  declare categoriaCarta: CategoriaCarta

  @column.date()
  declare validadeCarta: DateTime

  @column()
  declare telefone: string | null

  @column.date()
  declare dataNascimento: DateTime | null

  @column()
  declare morada: string | null

  @column()
  declare observacao: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => InfraccaoCondutor)
  declare infraccoes: HasMany<typeof InfraccaoCondutor>

  @hasMany(() => AvaliacaoCondutor)
  declare avaliacoes: HasMany<typeof AvaliacaoCondutor>

  @hasMany(() => Viatura, {
    foreignKey: 'condutorResponsavelId',
  })
  declare viaturas: HasMany<typeof Viatura>
}
