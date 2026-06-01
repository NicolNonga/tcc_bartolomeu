import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { TipoCombustivel, EstadoOperacional } from '../enum/viatura_enum.js'

export default class Viatura extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare matricula: string

  @column()
  declare marca: string
  @column()
  declare modelo: string

  @column()
  declare anoFabrico: number | null

  @column()
  declare numeroChassi: string | null

  @column()
  declare cor: string | null

  @column()
  declare tipoCombustivel: TipoCombustivel | null

  @column()
  declare quilometragemActual: number

  @column()
  declare estadoOperacional: EstadoOperacional

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
