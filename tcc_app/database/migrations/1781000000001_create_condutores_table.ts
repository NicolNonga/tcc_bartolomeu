import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'condutores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()
        .unique()

      table.string('numero_carta', 50).notNullable().unique()
      table.enum('categoria_carta', ['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE']).notNullable()
      table.date('validade_carta').notNullable()
      table.string('telefone', 30).nullable()
      table.date('data_nascimento').nullable()
      table.string('morada', 255).nullable()
      table.text('observacao').nullable()
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
