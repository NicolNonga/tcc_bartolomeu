import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'viaturas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('matricula', 50).unique().notNullable()
      table.string('marca', 100).notNullable()
      table.string('modelo', 100).notNullable()
      table.integer('ano_fabrico').nullable()
      table.string('numero_chassi', 100).unique().nullable()
      table.string('cor', 50).nullable()
      table.enum('tipo_combustivel', ['gasolina', 'diesel', 'electrico', 'hibrido']).nullable()
      table.bigInteger('quilometragem_actual').defaultTo(0)
      table
        .enum('estado_operacional', ['disponivel', 'em_servico', 'em_manutencao', 'inativa'])
        .defaultTo('disponivel')
      table.text('observacao').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
