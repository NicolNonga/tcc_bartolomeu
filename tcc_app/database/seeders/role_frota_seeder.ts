import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    await Role.updateOrCreateMany('slug', [
      {
        name: 'super-admin',
        description: 'Administrador do sistema',
        slug: 'super-admin-system',
        is_actived: true,
      },
      {
        name: 'gestor-frota',
        description: 'Gestor de frota',
        slug: 'gestor-frota',
        is_actived: true,
      },
      {
        name: 'condutor',
        description: 'Condutor de viaturas',
        slug: 'condutor',
        is_actived: true,
      },
    ])
  }
}
