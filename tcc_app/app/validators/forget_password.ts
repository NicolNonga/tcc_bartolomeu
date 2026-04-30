import vine from '@vinejs/vine'

export const ForgetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().exists(async (db, value) => {
      const email = await db.from('users').where('email', value).first()
      return email
    }),
  })
)
