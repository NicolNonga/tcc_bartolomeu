import vine from '@vinejs/vine'

export const fieldsResetPassword = {
  token: 'token',
  newPassword: 'nova senha',
}

export const resetPasswordValidator = vine.compile(
  vine.object({
    token: vine.string().exists(async (db, value) => {
      const token = await db.from('reset_password_tokens').where('token', value).first()
      return token
    }),
    newPassword: vine.string().minLength(8),
  })
)
