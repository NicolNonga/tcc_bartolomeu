import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Solicitacao from './solicitacao.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'
import User from './user.js'

export default class AtendimentoFronta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare solicitacaoId: number

  @column()
  declare viaturaId: number

  @column()
  declare motoristaId: number

  @column.date()
  declare dataSaida: DateTime

  @column()
  declare horaSaida: string

  @column.date()
  declare dataRetorno: DateTime | null

  @column()
  declare horaRetorno: string | null

  @column()
  declare quilometragemSaida: number | null

  @column()
  declare quilometragemRetorno: number | null

  @column()
  declare estadoAtendimento: 'agendado' | 'em_execucao' | 'concluido' | 'cancelado'

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Solicitacao)
  declare solicitacao: BelongsTo<typeof Solicitacao>

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>

  @belongsTo(() => User, {
    foreignKey: 'motoristaId',
  })
  declare motorista: BelongsTo<typeof User>
}
