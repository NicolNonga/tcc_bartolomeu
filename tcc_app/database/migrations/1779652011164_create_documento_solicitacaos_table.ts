import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documento_solicitacaos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('solicitacao_id')
        .unsigned()
        .references('id')
        .inTable('solicitacoes')
        .onDelete('CASCADE')

      table.string('nome_documento', 200).notNullable()
      table.string('arquivo', 255).notNullable()
      table.string('tipo_arquivo', 50).nullable()
      table.string('tamanho', 50).nullable()
      table.text('descricao').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
