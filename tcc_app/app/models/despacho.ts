import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Solicitacao from '#models/solicitacao'
import User from '#models/user'
import EstadoSolicitacao from '#models/estado_solicitacao'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Despacho extends BaseModel {
  static table = 'despachos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare solicitacaoId: number

  @column()
  declare gestorId: number

  @column()
  declare estadoSolicitacaoId: number

  @column()
  declare parecer: string

  @column()
  declare dataDespacho: string

  @belongsTo(() => Solicitacao, { foreignKey: 'solicitacaoId' })
  declare solicitacao: BelongsTo<typeof Solicitacao>

  @belongsTo(() => User, { foreignKey: 'gestorId' })
  declare gestor: BelongsTo<typeof User>

  @belongsTo(() => EstadoSolicitacao, { foreignKey: 'estadoSolicitacaoId' })
  declare estadoSolicitacao: BelongsTo<typeof EstadoSolicitacao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
