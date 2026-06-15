import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'abastecimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')

      table.date('data_abastecimento').notNullable()
      table.enum('tipo_combustivel', ['gasolina', 'diesel', 'electrico', 'hibrido']).notNullable()

      table.decimal('quantidade_litros', 10, 2).notNullable()
      table.decimal('valor_total', 12, 2).notNullable()

      table.bigInteger('quilometragem_registrada').nullable()
      table.string('posto_abastecimento', 150).nullable()
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
