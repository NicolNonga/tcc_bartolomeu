import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'manutencoes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('fornecedor').nullable()
      table.string('ordem_servico').nullable()
      table.integer('proxima_revisao_km').unsigned().nullable()
      table.date('proxima_revisao_data').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fornecedor')
      table.dropColumn('ordem_servico')
      table.dropColumn('proxima_revisao_km')
      table.dropColumn('proxima_revisao_data')
    })
  }
}
