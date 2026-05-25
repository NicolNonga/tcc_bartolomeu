import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'despachos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('solicitacao_id')
        .unsigned()
        .references('id')
        .inTable('solicitacoes')
        .onDelete('CASCADE')
      table.integer('gestor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('estado_solicitacao_id')
        .unsigned()
        .references('id')
        .inTable('estados_solicitacao')
        .onDelete('CASCADE')

      table.text('parecer').notNullable()
      table.date('data_despacho').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
