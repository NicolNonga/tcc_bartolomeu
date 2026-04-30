import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Permission from './permission.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare slug: string
  @column()
  declare name: string
  @column()
  declare description: string
  @column()
  declare is_actived: boolean

  @column()
  declare is_manager: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Permission, {
    pivotTable: 'permission_roles',
  })
  declare permission: ManyToMany<typeof Permission>
}
