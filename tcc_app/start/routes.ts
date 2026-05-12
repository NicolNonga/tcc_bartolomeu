/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import * as AutoSwaggerModule from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
const DepartamentosController = () => import('#controllers/departamentos_controller')

const AutoSwagger: any =
  (AutoSwaggerModule as any).default?.default ||
  (AutoSwaggerModule as any).default ||
  AutoSwaggerModule
const AuthsController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
import { middleware } from './kernel.js'

const ResetPasswordsController = () => import('#controllers/reset_passwords_controller')

const RolesController = () => import('#controllers/roles_controller')
const RolePermissionsController = () => import('#controllers/role_permissions_controller')
router.post('/auth', [AuthsController, 'store']).prefix('/api')

router
  .group(() => {
    router.post('/', [UsersController, 'store'])
    router.get('/', [UsersController, 'index'])
    router.put('/new_password', [UsersController, 'changePassword']).use(middleware.auth())
    router.put('/:userId/desable', [UsersController, 'desable'])
    router.put('/:userId/enable', [UsersController, 'enable'])
    router.put('/:userId/redefinar_senha', [UsersController, 'setNewPassword'])
    router.get('/dropDownList', [UsersController, 'dropDownList'])
    router.get('/dropDownListMangers', [UsersController, 'dropDownListManagers'])
  })
  .prefix('/api/users')

router
  .group(() => {
    router.post('/', [RolesController, 'store'])
    router.get('/', [RolesController, 'index'])
    router.get('/list-dropdown', [RolesController, 'dropDownList'])
    router.put('/:roleId/desable', [RolesController, 'desable'])
    router.put('/:roleId/enable', [RolesController, 'enable'])
    router.put('/:roleId', [RolesController, 'update'])
    router.get('/managers', [RolesController, 'showManagers'])
  })
  .prefix('/api/roles')

router
  .group(() => {
    router.post('/', [RolePermissionsController, 'store'])
    router.put('/', [RolePermissionsController, 'delete'])
  })
  .prefix('/api/roles_permission')

router.get('/departamentos', [DepartamentosController, 'index'])
router.get('/departamentos/:id', [DepartamentosController, 'show'])
router.post('/departamentos', [DepartamentosController, 'store'])
router.put('/departamentos/:id', [DepartamentosController, 'update'])
router.delete('/departamentos/:id', [DepartamentosController, 'destroy'])

router.get('/swagger', async () => {
  return AutoSwagger.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.ui('/swagger', swagger)
})
