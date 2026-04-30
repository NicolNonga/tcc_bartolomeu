import { DateTime } from 'luxon'

import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Role from './role.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static acessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 h',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare categorie_id?: number | null

  @column()
  declare email: string

  @column()
  declare roleId: number

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare first_acess: boolean

  @column()
  declare organizationId: number // drop organizationId

  @column()
  declare is_active?: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
