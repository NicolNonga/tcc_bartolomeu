import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class EstadoSolicitacao extends BaseModel {
  static table = 'estados_solicitacao'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cor: string | null

  @column()
  declare descricao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
