import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

export const existsInDb = (table: string, column = 'id') => {
  return vine.createRule(async (value: any, options, field) => {
    if (value === null || value === undefined) return
    const row = await db.from(table).where(column, value).first()

    if (!row) {
      field.report(`${field.name} does not exist in ${table}`, 'exists', field)
    }
  })
}
