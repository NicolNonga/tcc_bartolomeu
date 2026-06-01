import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'atendimento_frontas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('solicitacao_id')
        .unsigned()
        .references('id')
        .inTable('solicitacoes')
        .onDelete('CASCADE')
      table
        .integer('viatura_id')
        .unsigned()
        .references('id')
        .inTable('viaturas')
        .onDelete('CASCADE')
      table.integer('motorista_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.date('data_saida').notNullable()
      table.time('hora_saida').notNullable()
      table.date('data_retorno').nullable()
      table.time('hora_retorno').nullable()

      table.bigInteger('quilometragem_saida').nullable()
      table.bigInteger('quilometragem_retorno').nullable()

      table
        .enum('estado_atendimento', ['agendado', 'em_execucao', 'concluido', 'cancelado'])
        .defaultTo('agendado')
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
