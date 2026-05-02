import User from '#models/user'
import { SendEmail } from '#services/email/send_email'
import { GenerateRandomPassword } from '#services/hash/generate_password'
import { ChangePasswordValidator } from '#validators/change_password'
import { CreateUserValidator, userValidationMessage } from '#validators/create_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  constructor() {}

  private readonly sendEmail: SendEmail = new SendEmail()
  private readonly randoPassword: GenerateRandomPassword = new GenerateRandomPassword(10)

  /**
   * @index
   * @summary Listar utilizadores paginados
   * @description Retorna uma listagem paginada de todos os utilizadores com seus respetivos perfis e permissões ativas.
   * @tag Users
   * @authenticated
   *
   * @queryParam page - Número da página. Example: 1
   * @queryParam perPage - Quantidade de registos por página. Example: 10
   *
   * @responseBody 200 - {
   *   "meta": {
   *     "total": 1,
   *     "per_page": 10,
   *     "current_page": 1
   *   },
   *   "data": [
   *     {
   *       "id": 1,
   *       "fullName": "Administrador",
   *       "email": "admin@tcc.com",
   *       "is_active": true,
   *       "role": {
   *         "id": 1,
   *         "name": "Administrador"
   *       }
   *     }
   *   ]
   * }
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await User.query()
      .orderBy('created_at', 'desc')
      .preload('role', (role: any) => {
        role.preload('permission', (permission: any) => {
          permission.where('is_active', true)
        })
      })
      .paginate(page || 1, perPage || 10)

    return response.ok(data)
  }

  /**
   * @store
   * @summary Criar novo utilizador
   * @description Cadastra um novo utilizador no sistema, gera automaticamente uma palavra-passe aleatória e envia as credenciais por email.
   * @tag Users
   * @authenticated
   *
   * @requestBody <CreateUserValidator>
   *
   * @responseBody 200 - {
   *   "message": "Utilizador Criado"
   * }
   *
   * @responseBody 400 - {
   *   "message": "Falha ao cadastrar user"
   * }
   */
  async store({ request, response }: HttpContext) {
    const userValidation = await request.validateUsing(CreateUserValidator, {
      messagesProvider: userValidationMessage,
    })

    const userPassowrd = this.randoPassword.handle()

    try {
      const user = await User.create({
        fullName: userValidation.fullName,
        email: userValidation.email,
        roleId: userValidation.roleId,
        password: userPassowrd,
      })

      this.sendEmail.send({
        to: userValidation.email,
        subject: 'Password Do Sistema',
        content: `Crendicias para acesso ao sistema de peças ${userPassowrd}`,
      })

      return response.status(200).send({ message: 'Utilizador Criado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastrar user', data: error })
    }
  }

  /**
   * @update
   * @summary Atualizar utilizador
   * @description Atualiza os dados cadastrais e o perfil de acesso de um utilizador existente.
   * @tag Users
   * @authenticated
   *
   * @paramPath userId - ID do utilizador
   * @requestBody <CreateUserValidator>
   *
   * @responseBody 200 - {
   *   "message": "Utilizadore Actualizado"
   * }
   *
   * @responseBody 400 - {
   *   "message": "Utilizador Não Encontrado"
   * }
   */
  async update({ request, response, params }: HttpContext) {
    const { userId } = params
    const userPayload = await request.validateUsing(CreateUserValidator, {
      messagesProvider: userValidationMessage,
    })

    const user = await User.findBy('id', userId)
    if (!user) return response.badRequest({ message: 'Utilizador Não Encontrado' })

    user.fullName = userPayload.fullName
    user.email = userPayload.email
    user.roleId = userPayload.roleId

    await user.save()

    return response.ok({ message: 'Utilizadore Actualizado' })
  }

  /**
   * @changePassword
   * @summary Alterar palavra-passe no primeiro acesso
   * @description Permite ao utilizador autenticado alterar a sua palavra-passe inicial e invalida o token atual.
   * @tag Users
   * @authenticated
   *
   * @requestBody <ChangePasswordValidator>
   *
   * @responseBody 200 - {
   *   "message": "Palavra-pass Actualizada"
   * }
   */
  async changePassword({ request, response, auth }: HttpContext) {
    const { email, newPassword } = await request.validateUsing(ChangePasswordValidator)
    const currentUser = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier

    if (!token) {
      return response.badRequest({ message: 'token not found' })
    }

    const user = await User.findBy('email', email)
    if (!user) {
      return response.badRequest({ message: 'utilizador não encontrado' })
    }

    user.password = newPassword
    user.first_acess = false

    await user.save()
    await User.accessTokens.delete(currentUser, token)

    return response.status(200).send({ message: 'Palavra-pass Actualizada' })
  }

  /**
   * @desable
   * @summary Desativar utilizador
   * @description Marca o utilizador como inativo no sistema.
   * @tag Users
   * @authenticated
   *
   * @paramPath userId - ID do utilizador
   *
   * @responseBody 200 - {
   *   "message": "Usuario desativao"
   * }
   */
  async desable({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario não encontrado' })

      user.is_active = false
      await user.save()

      return response.status(200).send({ message: 'Usuario desativao' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao desativar ' })
    }
  }

  /**
   * @enable
   * @summary Ativar utilizador
   * @description Reativa um utilizador previamente desativado.
   * @tag Users
   * @authenticated
   *
   * @paramPath userId - ID do utilizador
   *
   * @responseBody 200 - {
   *   "message": "Uusario Activado"
   * }
   */
  async enable({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario não encontrado' })

      user.is_active = true
      await user.save()

      return response.status(200).send({ message: 'Uusario Activado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao  activar usuario ' })
    }
  }

  /**
   * @setNewPassword
   * @summary Redefinir palavra-passe do utilizador
   * @description Gera uma nova palavra-passe aleatória, grava no sistema e envia ao utilizador por email.
   * @tag Users
   * @authenticated
   *
   * @paramPath userId - ID do utilizador
   *
   * @responseBody 200 - {
   *   "message": "Senha redefinida"
   * }
   */
  async setNewPassword({ response, params }: HttpContext) {
    const { userId } = params
    try {
      const user = await User.findBy('id', userId)
      if (!user) return response.badRequest({ message: 'Usuario nao encontrado' })

      const newPassword = this.randoPassword.handle()
      user.password = newPassword
      await user.save()

      this.sendEmail.send({
        to: user.email,
        content: `A sua palavra-pass vou redefinida para ${newPassword}`,
        subject: 'Palavra-pass redefinida',
      })

      return response.status(200).send({ message: 'Senha redefinida' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao redefinar a senha' })
    }
  }

  /**
   * @dropDownList
   * @summary Dropdown de utilizadores ativos
   * @description Retorna lista simplificada de utilizadores ativos para popular selects no frontend.
   * @tag Users
   * @authenticated
   */
  async dropDownList({ response }: HttpContext) {
    const data = await User.query().where('is_active', true)
    return response.ok({ data })
  }

  /**
   * @dropDownListManagers
   * @summary Dropdown de gestores ativos
   * @description Retorna lista simplificada apenas com utilizadores gestores ativos.
   * @tag Users
   * @authenticated
   */
  async dropDownListManagers({ response }: HttpContext) {
    const data = await User.query()
      .where('is_active', true)
      .whereHas('role', (builder) => {
        builder.where('is_manager', 1)
      })

    return response.ok({ data })
  }
}
