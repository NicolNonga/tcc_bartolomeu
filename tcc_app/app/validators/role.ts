import vine, { SimpleMessagesProvider } from '@vinejs/vine'
const fields = {
  name: 'nome',
  description: 'descrição',
}

export const CreateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const name = await db.from('roles').where('name', value).first()
      return !name
    }),
    description: vine.string().nullable(),
  })
)

export const roleValidationMessage = new SimpleMessagesProvider(
  {
    // Applicable for all fields
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',
  },
  fields
)
