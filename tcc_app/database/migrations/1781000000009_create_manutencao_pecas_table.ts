import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manutencao_pecas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('manutencao_id')
        .unsigned()
        .references('id')
        .inTable('manutencoes')
        .onDelete('CASCADE')

      table.string('nome_peca', 200).notNullable()
      table.integer('quantidade').defaultTo(1)
      table.decimal('custo_unitario', 12, 2).notNullable()
      table.decimal('custo_total', 12, 2).notNullable()
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
