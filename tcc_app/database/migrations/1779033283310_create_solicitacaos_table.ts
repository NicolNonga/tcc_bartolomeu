import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'solicitacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('codigo', 30).unique().notNullable()

      table
        .integer('solicitante_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('departamento_id')
        .unsigned()
        .references('id')
        .inTable('departamentos')
        .onDelete('CASCADE')
      table
        .integer('tipo_servico_id')
        .unsigned()
        .references('id')
        .inTable('tipos_servico')
        .onDelete('CASCADE')
      table
        .integer('estado_solicitacao_id')
        .unsigned()
        .references('id')
        .inTable('estados_solicitacao')
        .onDelete('CASCADE')

      table.text('descricao').notNullable()
      table.date('data_necessidade').notNullable()
      table.time('hora_necessidade').nullable()
      table.string('local_saida', 255).nullable()
      table.string('local_destino', 255).nullable()
      table.enum('prioridade', ['baixa', 'media', 'alta', 'urgente']).defaultTo('media')
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
