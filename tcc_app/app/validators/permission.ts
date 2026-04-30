import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  name: 'permission',
  description: 'descricao',
}

export const permissionCustomMessage = new SimpleMessagesProvider({
  'required': 'O {{ field }} é obrigatorio',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'O campo {{field}} não um endereco de  email',
  'email.unique': 'Ja existe {{field}} com existe campo',
  'database.unique': 'Ja  existe um {{field}} cadastrado',
})
export const CreatePermissionValidator = vine.compile(
  vine.object({
    name: vine.string().unique(async (db, value) => {
      const name = await db.from('permissions').where('name', value).first()
      return !name
    }),
    description: vine.string().nullable(),
  })
)
