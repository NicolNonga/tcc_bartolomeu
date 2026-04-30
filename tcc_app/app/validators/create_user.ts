import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  fullName: 'nome completo',
  email: 'email',
  roleId: 'perfil',
  phone_number: 'telefone',
  categorie_id: 'categoria',
}

export const CreateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().nullable(),
    roleId: vine.number().exists(async (db, value) => {
      const role = await db.from('roles').where('id', value).first()
      return role
    }),
    managerId: vine
      .number()
      .exists(async (db, value) => {
        const manage = await db.from('users').where('id', value).first()
        return manage
      })
      .optional(),
    categorie_id: vine.number().exists(async (db, value) => {
      const category = await db.from('categories').where('id', value).first()
      return category
    }),
    email: vine
      .string()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      })
      .email(),
    phone_number: vine.string().unique(async (db, value) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const phone_number = await db.from('users').where('phone_number', value).first()
      return !phone_number
    }),
  })
)

export const userValidationMessage = new SimpleMessagesProvider(
  {
    // Applicable for all fields
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'email': 'O campo {{field}} não um endereco de  email',
    'email.unique': 'Ja existe {{field}} com existe campo',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',

    // Error message for the custom fields
    'name.required': 'Please enter name',
    'password.required': 'Please enter password',
  },
  fields
)
