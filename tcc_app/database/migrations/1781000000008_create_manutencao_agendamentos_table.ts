import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manutencao_agendamentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')

      table.string('descricao', 255).notNullable()
      table.enum('tipo_agendamento', ['por_km', 'por_data']).notNullable()
      table.bigInteger('quilometragem_alvo').nullable()
      table.date('data_alvo').nullable()
      table.boolean('alerta_enviado').defaultTo(false)
      table.boolean('concluido').defaultTo(false)
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
