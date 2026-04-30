import Role from '#models/role'
import { CreateRoleValidator, roleValidationMessage } from '#validators/role'
import { roleValidationUpdateMessage, updateRoleValidator } from '#validators/update_role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({ request, response }: HttpContext) {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const data = await Role.query()
      .preload('permission', (permission) => {
        permission.where('is_active', true)
      })
      .orderBy('id', 'desc')
      .paginate(page | 1, perPage | 10)

    return response.ok(data)
  }

  async dropDownList({ response }: HttpContext) {
    const data = await Role.query().whereNot('name', 'super-admin').where('is_actived', true)
    return response.ok({ data })
  }
  async showManagers({ response }: HttpContext) {
    const data = await Role.query().where('is_manager', true).where('is_actived', true)
    return response.ok({ data })
  }
  async store({ request, response }: HttpContext) {
    const { name, description } = await request.validateUsing(CreateRoleValidator, {
      messagesProvider: roleValidationMessage,
    })

    try {
      const role = await Role.query().where('name', name).first()
      if (role) return response.badRequest({ message: 'Nome do Perfil já existe' })
      await Role.create({
        slug: `${name.replace(/\s+/g, '_')}role`,
        name,
        description: description ? description : undefined,
      })
      return response.status(200).send({ message: 'Perfil Criado Com Sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao cadastra permissao', data: error })
    }
  }

  async update({ request, response, params }: HttpContext) {
    const { roleId } = params
    const { name, description } = await request.validateUsing(updateRoleValidator, {
      messagesProvider: roleValidationUpdateMessage,
      meta: {
        roleId: roleId,
      },
    })
    try {
      const role = await Role.findBy('id', roleId)
      if (!role) return response.badRequest({ message: 'Role Nao encontrada' })

      role.name = name
      role.description = description ? description : ''
      await role.save()
      return response.status(200).send({ message: 'Role Actualizado' })
    } catch (error) {
      return response.badRequest({ message: 'Falhao ao Actualizar Role' })
    }
  }
  async enable({ response, params }: HttpContext) {
    const { roleId } = params

    try {
      const role = await Role.findBy('id', roleId)
      if (!role) return response.badRequest({ message: 'Perfil Não Encontrado' })
      role.is_actived = true
      await role.save()
      return response.status(200).send({ message: 'Perfil activado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao activar perfil' })
    }
  }
  async desable({ response, params }: HttpContext) {
    const { roleId } = params

    try {
      const role = await Role.findBy('id', roleId)
      if (!role) return response.badRequest({ message: 'Perfil Não Encontrado' })
      if (role.name === 'admin')
        return response.badRequest({ message: 'Não pode desactivar perfil admin' })
      role.is_actived = false
      await role.save()
      return response.status(200).send({ message: 'Perfil desativado' })
    } catch (error) {
      return response.badRequest({ message: 'Falha ao desativar perfil' })
    }
  }
}
