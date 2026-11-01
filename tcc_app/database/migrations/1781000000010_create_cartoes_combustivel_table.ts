import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cartoes_combustivel'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('numero_cartao', 50).notNullable().unique()
      table.string('fornecedor', 150).nullable()
      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('condutor_id')
        .unsigned()
        .references('id')
        .inTable('condutores')
        .onDelete('SET NULL')
        .nullable()
      table.decimal('limite_mensal', 12, 2).nullable()
      table.boolean('is_active').defaultTo(true)
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
