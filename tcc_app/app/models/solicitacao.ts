import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Departamento from '#models/departamento'
import TipoServico from '#models/tipo_servico'
import EstadoSolicitacao from '#models/estado_solicitacao'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Solicitacao extends BaseModel {
  static table = 'solicitacoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codigo: string

  @column()
  declare solicitanteId: number

  @column()
  declare departamentoId: number

  @column()
  declare tipoServicoId: number

  @column()
  declare estadoSolicitacaoId: number

  @column()
  declare descricao: string

  @column()
  declare dataNecessidade: string

  @column()
  declare horaNecessidade: string

  @column()
  declare localSaida: string

  @column()
  declare localDestino: string

  @column()
  declare prioridade: string

  @column()
  declare observacao: string

  @belongsTo(() => User, { foreignKey: 'solicitanteId' })
  declare solicitante: BelongsTo<typeof User>

  @belongsTo(() => Departamento, { foreignKey: 'departamentoId' })
  declare departamento: BelongsTo<typeof Departamento>

  @belongsTo(() => TipoServico, { foreignKey: 'tipoServicoId' })
  declare tipoServico: BelongsTo<typeof TipoServico>

  @belongsTo(() => EstadoSolicitacao, { foreignKey: 'estadoSolicitacaoId' })
  declare estadoSolicitacao: BelongsTo<typeof EstadoSolicitacao>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
