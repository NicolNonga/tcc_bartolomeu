import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Viatura from './viatura.js'

export default class ManutencaoAgendamento extends BaseModel {
  static table = 'manutencao_agendamentos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare descricao: string

  @column()
  declare tipoAgendamento: 'por_km' | 'por_data'

  @column()
  declare quilometragemAlvo: number | null

  @column.date()
  declare dataAlvo: DateTime | null

  @column()
  declare alertaEnviado: boolean

  @column()
  declare concluido: boolean

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>
}
