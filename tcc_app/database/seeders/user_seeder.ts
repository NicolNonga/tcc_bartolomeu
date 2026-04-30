import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const uniqueKey = 'id'
    const role = await Role.query().select('id').where('slug', 'super-admin-system').first()
    await User.updateOrCreateMany(uniqueKey, [
      {
        id: 1,
        password: '1234',
        email: 'nicodemosarmindo@gmail.com',
        roleId: role?.id,
        fullName: 'user root',
      },
    ])
  }
}
