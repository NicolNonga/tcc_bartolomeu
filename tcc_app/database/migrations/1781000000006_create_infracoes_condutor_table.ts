import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'infracoes_condutor'

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
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('SET NULL')
        .nullable()

      table.date('data_infraccao').notNullable()
      table.string('local', 255).nullable()
      table.text('descricao').notNullable()
      table.enum('gravidade', ['leve', 'grave', 'muito_grave']).defaultTo('leve')
      table.decimal('valor_multa', 12, 2).nullable()
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
