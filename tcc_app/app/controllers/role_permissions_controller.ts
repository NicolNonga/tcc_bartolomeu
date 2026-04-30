import PermissionRole from '#models/permission_role'
import { userValidationMessage } from '#validators/create_user'
import { rolePermissionValidation } from '#validators/role_permission'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolePermissionsController {
  async store({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { permission_id, role_id } = await request.validateUsing(rolePermissionValidation, {
      messagesProvider: userValidationMessage,
    })
    try {
      const rolePermission = await PermissionRole.query()
        .where('permission_id', permission_id)
        .where('role_id', role_id)
        .first()
      if (rolePermission) return response.badRequest({ message: 'Permissão já adicionada' })
      await PermissionRole.create({
        permission_id,
        role_id,
      })
      return response.status(200).send({ message: 'Permissao associada com sucesso' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao associar a permissao do perfi', data: error })
    }
  }
  async delete({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { permission_id, role_id } = await request.validateUsing(rolePermissionValidation, {
      messagesProvider: userValidationMessage,
    })

    try {
      await PermissionRole.query()
        .where('role_id', role_id)
        .where('permission_id', permission_id)
        .delete()
      return response.status(200).send({ message: 'Permissao removida ' })
    } catch (error) {
      return response.badRequest({ message: 'falha ao associar ao remover permissao', data: error })
    }
  }
}
