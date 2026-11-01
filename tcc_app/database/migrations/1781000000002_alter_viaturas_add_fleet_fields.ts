import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'viaturas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('categoria', ['ligeiro', 'pesado', 'moto', 'autocarro', 'outro'])
        .nullable()
        .after('cor')
      table.integer('capacidade').nullable().after('categoria')
      table
        .enum('estado_viatura', ['activo', 'em_manutencao', 'abatido', 'vendido'])
        .defaultTo('activo')
        .after('estado_operacional')
      table
        .integer('condutor_responsavel_id')
        .unsigned()
        .references('id')
        .inTable('condutores')
        .onDelete('SET NULL')
        .nullable()
        .after('estado_viatura')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['condutor_responsavel_id'])
      table.dropColumn('condutor_responsavel_id')
      table.dropColumn('estado_viatura')
      table.dropColumn('capacidade')
      table.dropColumn('categoria')
    })
  }
}
