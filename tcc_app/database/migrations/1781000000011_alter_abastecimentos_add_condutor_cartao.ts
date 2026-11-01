import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abastecimentos'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('condutor_id')
        .unsigned()
        .references('id')
        .inTable('condutores')
        .onDelete('SET NULL')
        .nullable()
        .after('viatura_id')
      table
        .integer('cartao_combustivel_id')
        .unsigned()
        .references('id')
        .inTable('cartoes_combustivel')
        .onDelete('SET NULL')
        .nullable()
        .after('condutor_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['cartao_combustivel_id'])
      table.dropColumn('cartao_combustivel_id')
      table.dropForeign(['condutor_id'])
      table.dropColumn('condutor_id')
    })
  }
}
