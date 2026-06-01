import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Viatura from './viatura.js'

export default class Manutencao extends BaseModel {
  static table = 'manutencoes'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare viaturaId: number

  @column()
  declare tipoManutencao: 'preventiva' | 'correctiva' | 'inspecao'

  @column()
  declare descricao: string

  @column()
  declare oficina: string | null

  @column.date()
  declare dataEntrada: DateTime

  @column.date()
  declare dataSaida: DateTime | null

  @column()
  declare quilometragemManutencao: number | null

  @column()
  declare custo: number | null

  @column()
  declare estadoManutencao: 'aberta' | 'em_execucao' | 'concluida' | 'cancelada'

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Viatura)
  declare viatura: BelongsTo<typeof Viatura>
}
