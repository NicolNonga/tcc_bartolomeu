import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manutencoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')

      table.enum('tipo_manutencao', ['preventiva', 'correctiva', 'inspecao']).notNullable()
      table.text('descricao').notNullable()
      table.string('oficina', 200).nullable()

      table.date('data_entrada').notNullable()
      table.date('data_saida').nullable()

      table.bigInteger('quilometragem_manutencao').nullable()
      table.decimal('custo', 12, 2).nullable()

      table
        .enum('estado_manutencao', ['aberta', 'em_execucao', 'concluida', 'cancelada'])
        .defaultTo('aberta')
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
