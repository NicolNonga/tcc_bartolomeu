import ResetPasswordToken from '#models/reset_password_token'
import User from '#models/user'
import { customerMessageValidator } from '#validators/customer_message_validator'
import { fieldsResetPassword, resetPasswordValidator } from '#validators/reset_password'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'

export default class ResetPasswordsController {
  async store({ request, response }: HttpContext) {
    const { token, newPassword } = await request.validateUsing(resetPasswordValidator, {
      messagesProvider: customerMessageValidator(fieldsResetPassword),
    })

    const tokenRecord = await ResetPasswordToken.query()
      .where('token', token)
      .where('used', false)
      .first()

    if (!tokenRecord) return response.badRequest({ message: 'token Invalido' })
    if (this.isTokenExpirate(tokenRecord.expiresAt))
      return response.badRequest({ message: 'token expirado' })

    if (await this.findUserEmail(tokenRecord.email)) {
      await this.updateUserPassword(newPassword, tokenRecord.email)
      tokenRecord.used = true
      await tokenRecord.save()
      return response.ok({ message: 'Nova Password Setada' })
    }
  }

  private isTokenExpirate(expireAt: DateTime): boolean {
    return expireAt < DateTime.now()
  }
  private async findUserEmail(email: string): Promise<User | undefined> {
    const user = await User.query().where('email', email).first()
    if (user) return user
  }
  private async updateUserPassword(password: string, email: string) {
    await User.query()
      .where('email', email)
      .update({ password: await hash.make(password) })
  }
}
