import User from '#models/user'
import { authValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthsController {
  /**
   * @store
   * @summary Realizar login no sistema
   * @description Autentica um utilizador através do email e senha e retorna token de acesso com dados do utilizador.
   * @tag Auth
   *
   * @requestBody <authValidator>
   *
   * @responseBody 200 - {
   *   "message": "Login Feito Com Sucesso",
   *   "data": {
   *     "token": {
   *       "type": "bearer",
   *       "name": "oat",
   *       "token": "1|xpto_token_value"
   *     },
   *     "user": {
   *       "id": 1,
   *       "name": "Administrador",
   *       "email": "admin@tcc.com",
   *       "is_actived": true,
   *       "role": {
   *         "id": 1,
   *         "name": "Administrador",
   *         "permission": [
   *           {
   *             "id": 1,
   *             "name": "users.create"
   *           }
   *         ]
   *       }
   *     }
   *   }
   * }
   *
   * @responseBody 400 - {
   *   "message": "Email ou Senha Invalida"
   * }
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(authValidator)

    const user = await User.query()
      .preload('role', (role) => {
        role.where('is_actived', true).preload('permission', (permission) => {
          permission.where('is_active', true)
        })
      })
      .where('email', email)
      .first()

    if (!user) return response.abort({ message: 'Email ou Senha Invalida' })

    await hash.verify(user.password, password)
    const userFound = await User.verifyCredentials(email, password)

    if (!userFound) return response.abort({ message: 'Email ou Senha Invalida' })

    const token = await User.accessTokens.create(userFound)

    return response.status(200).send({
      message: 'Login Feito Com Sucesso',
      data: { token, user },
    })
  }

  /**
   * @logout
   * @summary Terminar sessão do utilizador autenticado
   * @description Invalida o token atual do utilizador autenticado.
   * @tag Auth
   * @authenticated
   *
   * @responseBody 200 - {
   *   "message": "Logged out"
   * }
   *
   * @responseBody 400 - {
   *   "message": "Token Não Encontrado"
   * }
   *
   * @responseBody 401 - {
   *   "message": "Unauthorized access"
   * }
   */
  async logout({ response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier

    if (!token) {
      return response.badRequest({ message: 'Token Não Encontrado' })
    }

    await User.acessTokens.delete(user, token)

    return response.ok({ message: 'Logged out' })
  }
}
