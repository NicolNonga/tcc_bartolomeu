import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'anexo_viaturas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')

      table.string('nome', 200).notNullable()
      table.string('arquivo', 500).notNullable()
      table.string('tipo_arquivo', 50).nullable()
      table.string('tamanho', 30).nullable()
      table.text('descricao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
