import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Solicitacao from '#models/solicitacao'

export default class DocumentoSolicitacao extends BaseModel {
  static table = 'documento_solicitacaos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare solicitacaoId: number

  @column()
  declare nomeDocumento: string

  @column()
  declare arquivo: string

  @column()
  declare tipoArquivo: string

  @column()
  declare tamanho: string

  @column()
  declare descricao: string

  @belongsTo(() => Solicitacao, { foreignKey: 'solicitacaoId' })
  declare solicitacao: BelongsTo<typeof Solicitacao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
