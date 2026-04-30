import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  role_id: 'Perfil',
  permission_id: 'Permissao',
}
export const rolePermissionValidation = vine.compile(
  vine.object({
    role_id: vine.number().exists(async (db, value) => {
      const role = await db.from('roles').where('id', value).first()
      return role
    }),

    permission_id: vine.number().exists(async (db, value) => {
      const permission = await db
        .from('permissions')
        .where('id', value)
        .where('is_active', true)
        .first()
      return permission
    }),
  })
)

export const constumMessagemProvider = new SimpleMessagesProvider(
  {
    // Applicable for all fields
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'email': 'O campo {{field}} não um endereco de  email',
    'email.unique': 'Ja existe {{field}} com existe campo',
    'database.unique': 'Ja  existe um {{field}} cadastrado',
    'database.exists': ' {{field}} Nao exsite ',
    // Error message for the custom fields
    'name.required': 'Please enter name',
    'email.required': 'Please enter email',
    'password.required': 'Please enter password',
  },
  fields
)
