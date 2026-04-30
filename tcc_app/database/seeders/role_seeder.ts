import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Role.firstOrCreate({
      name: 'super-admin',
      description: 'super-admin of the system',
      slug: 'super-admin-system',
    })
  }
}
