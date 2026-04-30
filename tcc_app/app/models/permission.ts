import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare slug: string
  @column()
  declare name: string
  @column()
  declare description: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column()
  declare is_active: boolean

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
