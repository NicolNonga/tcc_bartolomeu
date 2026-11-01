import User from '#models/user'
import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const gestorRole = await Role.findBy('slug', 'gestor-frota')
    const condutorRole = await Role.findBy('slug', 'condutor')

    await User.updateOrCreateMany('email', [
      {
        email: 'gestor.frota@tcc.com',
        password: '1234',
        fullName: 'João Gestor Frota',
        roleId: gestorRole?.id,
        is_active: true,
        first_acess: false,
      },
      {
        email: 'pedro.condutor@tcc.com',
        password: '1234',
        fullName: 'Pedro Condutor',
        roleId: condutorRole?.id,
        is_active: true,
        first_acess: false,
      },
      {
        email: 'maria.condutor@tcc.com',
        password: '1234',
        fullName: 'Maria Condutora',
        roleId: condutorRole?.id,
        is_active: true,
        first_acess: false,
      },
    ])
  }
}
