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
const EstadosSolicitacaoController = () => import('#controllers/estados_solicitacao_controller')
const SolicitacoesController = () => import('#controllers/solicitacoes_controller')
const AutoSwagger: any =
  (AutoSwaggerModule as any).default?.default ||
  (AutoSwaggerModule as any).default ||
  AutoSwaggerModule
const AuthsController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
import { middleware } from './kernel.js'
const ViaturasController = () => import('#controllers/viaturas_controller')
const DocumentosSolicitacaoController = () =>
  import('#controllers/documentos_solicitacaos_controller')
const DespachosController = () => import('#controllers/despachos_controller')
const TipoServicoController = () => import('#controllers/tipo_servicos_controller')

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

router
  .group(() => {
    router.get('/', [DepartamentosController, 'index'])
    router.get('/:id', [DepartamentosController, 'show'])
    router.post('/', [DepartamentosController, 'store'])
    router.put('/:id', [DepartamentosController, 'update'])
    router.delete('/:id', [DepartamentosController, 'destroy'])
  })
  .prefix('/api/departamentos')

router.get('/estados-solicitacao', [EstadosSolicitacaoController, 'index'])
router.get('/estados-solicitacao/:id', [EstadosSolicitacaoController, 'show'])
router.post('/estados-solicitacao', [EstadosSolicitacaoController, 'store'])
router.put('/estados-solicitacao/:id', [EstadosSolicitacaoController, 'update'])
router.delete('/estados-solicitacao/:id', [EstadosSolicitacaoController, 'destroy'])

router
  .group(() => {
    router.get('/', [SolicitacoesController, 'index'])
    router.get('/minhas', [SolicitacoesController, 'minhas']).use(middleware.auth())
    router.get('/:id', [SolicitacoesController, 'show']).use(middleware.auth())
    router.post('/', [SolicitacoesController, 'store']).use(middleware.auth())
    router.put('/:id', [SolicitacoesController, 'update']).use(middleware.auth())
  })
  .prefix('/api/solicitacoes')

router
  .group(() => {
    router.get('/', [TipoServicoController, 'index'])
    router.get('/:id', [TipoServicoController, 'show'])
    router.post('/', [TipoServicoController, 'store'])
    router.put('/:id', [TipoServicoController, 'update'])
    router.delete('/:id', [TipoServicoController, 'destroy'])
  })
  .prefix('/api/tipo_servicos')

router
  .group(() => {
    router.post('/', [DespachosController, 'store'])
    router.get('/solicitacao/:solicitacaoId', [DespachosController, 'historico'])
  })
  .prefix('/api/despachos')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [DocumentosSolicitacaoController, 'store'])
    router.get('/solicitacao/:solicitacaoId', [DocumentosSolicitacaoController, 'index'])
    router.delete('/:id', [DocumentosSolicitacaoController, 'destroy'])
  })
  .prefix('/api/documentos-solicitacao')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [ViaturasController, 'store'])
    router.get('/', [ViaturasController, 'listar'])
  })
  .prefix('/api/viaturas')
  .use(middleware.auth())
router.get('/swagger', async () => {
  return AutoSwagger.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.ui('/swagger', swagger)
})
