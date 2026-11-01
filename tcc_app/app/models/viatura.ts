import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import {
  TipoCombustivel,
  EstadoOperacional,
  CategoriaViatura,
  EstadoViatura,
} from '../enum/viatura_enum.js'
import Condutor from './condutor.js'
import DocumentoViatura from './documento_viatura.js'
import HistoricoQuilometragem from './historico_quilometragem.js'
import AnexoViatura from './anexo_viatura.js'
import Manutencao from './manutencao.js'
import Abastecimento from './abastecimento.js'

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
  declare categoria: CategoriaViatura | null

  @column()
  declare capacidade: number | null

  @column()
  declare quilometragemActual: number

  @column()
  declare estadoOperacional: EstadoOperacional

  @column()
  declare estadoViatura: EstadoViatura

  @column()
  declare condutorResponsavelId: number | null

  @column()
  declare observacao: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Condutor, { foreignKey: 'condutorResponsavelId' })
  declare condutorResponsavel: BelongsTo<typeof Condutor>

  @hasMany(() => DocumentoViatura)
  declare documentos: HasMany<typeof DocumentoViatura>

  @hasMany(() => HistoricoQuilometragem)
  declare historicoQuilometragem: HasMany<typeof HistoricoQuilometragem>

  @hasMany(() => AnexoViatura)
  declare anexos: HasMany<typeof AnexoViatura>

  @hasMany(() => Manutencao)
  declare manutencoes: HasMany<typeof Manutencao>

  @hasMany(() => Abastecimento)
  declare abastecimentos: HasMany<typeof Abastecimento>
}
