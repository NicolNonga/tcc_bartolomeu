import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Permission.fetchOrCreateMany('id', [
      {
        id: 1,
        name: 'create-users',
        description: 'simple-permission to create users',
        is_active: true,
        slug: 'create-users',
      },
      {
        id: 2,
        name: 'list-users',
        slug: 'list-users',
        description: 'simple-permission to create users',
        is_active: true,
      },
      {
        id: 3,
        name: 'create-roles',
        description: 'simple-permission to create users',
        is_active: true,
        slug: 'create-role',
      },

      {
        id: 4,
        name: 'list-roles',
        description: 'simple-permission to create users',
        is_active: true,
        slug: 'list-roles',
      },
      {
        id: 5,
        name: 'desable-role',
        description: 'simple-permission to create users',
        is_active: true,
        slug: 'desable-roles',
      },
    ])
  }
}
