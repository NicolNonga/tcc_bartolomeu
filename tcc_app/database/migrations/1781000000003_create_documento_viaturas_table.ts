import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documento_viaturas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')

      table.enum('tipo_documento', ['seguro', 'inspeccao', 'licenca_circulacao']).notNullable()
      table.string('numero_documento', 100).nullable()
      table.string('entidade_emissora', 200).nullable()
      table.date('data_emissao').nullable()
      table.date('data_validade').notNullable()
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
