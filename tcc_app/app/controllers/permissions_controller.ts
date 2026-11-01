import type { HttpContext } from '@adonisjs/core/http'
import Permission from '#models/permission'

export default class PermissionsController {
  async index({ response }: HttpContext) {
    const data = await Permission.query().where('is_active', true).orderBy('name')
    return response.ok({ data })
  }
}
