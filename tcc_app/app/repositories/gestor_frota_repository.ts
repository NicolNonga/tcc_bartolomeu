import User from '#models/user'
import Role from '#models/role'

const ROLES_GESTAO_FROTA = ['super-admin-system', 'gestor-frota']

export default class GestorFrotaRepository {
  async listarGestores() {
    const roles = await Role.query().whereIn('slug', ROLES_GESTAO_FROTA)
    if (!roles.length) return []

    return User.query()
      .whereIn(
        'roleId',
        roles.map((r) => r.id)
      )
      .where('is_active', true)
      .preload('role')
  }
}
