import vine from '@vinejs/vine'

export const ChangePasswordValidator = vine.compile(
  vine.object({
    newPassword: vine.string(),
    email: vine.string().email(),
  })
)
