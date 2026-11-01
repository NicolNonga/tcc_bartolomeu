import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'avaliacoes_condutor'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('condutor_id')
        .unsigned()
        .references('id')
        .inTable('condutores')
        .onDelete('CASCADE')

      table
        .integer('avaliador_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()

      table.date('data_avaliacao').notNullable()
      table.integer('pontuacao').notNullable()
      table.text('comentario').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
