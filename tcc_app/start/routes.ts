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
const RelatoriosController = () => import('#controllers/relatorio_geral_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const AbastecimentosController = () => import('#controllers/abastecimentos_controller')
const ManutencoesController = () => import('#controllers/manutencoes_controller')
const AtendimentosFrotaController = () => import('#controllers/atendimentos_frotas_controller')
const ViaturasController = () => import('#controllers/viaturas_controller')
const DocumentosSolicitacaoController = () =>
  import('#controllers/documentos_solicitacaos_controller')
const DespachosController = () => import('#controllers/despachos_controller')
const TipoServicoController = () => import('#controllers/tipo_servicos_controller')

const CondutoresController = () => import('#controllers/condutores_controller')
const InfraccoesCondutorController = () => import('#controllers/infraccoes_condutor_controller')
const AvaliacoesCondutorController = () => import('#controllers/avaliacoes_condutor_controller')
const DocumentosViaturaController = () => import('#controllers/documentos_viatura_controller')
const AnexosViaturaController = () => import('#controllers/anexos_viatura_controller')
const HistoricoQuilometragemController = () =>
  import('#controllers/historico_quilometragem_controller')
const ManutencaoAgendamentosController = () =>
  import('#controllers/manutencao_agendamentos_controller')
const ManutencaoPecasController = () => import('#controllers/manutencao_pecas_controller')
const CartoesCombustivelController = () => import('#controllers/cartoes_combustivel_controller')
const ConsumoCombustivelController = () => import('#controllers/consumo_combustivel_controller')
const AlertasController = () => import('#controllers/alertas_controller')
const AuditLogsController = () => import('#controllers/audit_logs_controller')
const NotificacoesController = () => import('#controllers/notificacoes_controller')

const ResetPasswordsController = () => import('#controllers/reset_passwords_controller')

const RolesController = () => import('#controllers/roles_controller')
const RolePermissionsController = () => import('#controllers/role_permissions_controller')
const PermissionsController = () => import('#controllers/permissions_controller')
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
    router.put('/:userId', [UsersController, 'update'])
  })
  .prefix('/api/users')
  .use(middleware.auth())

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
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [PermissionsController, 'index'])
  })
  .prefix('/api/permissions')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [RolePermissionsController, 'store'])
    router.put('/', [RolePermissionsController, 'delete'])
  })
  .prefix('/api/roles_permission')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [DepartamentosController, 'index'])
    router.get('/:id', [DepartamentosController, 'show'])
    router.post('/', [DepartamentosController, 'store'])
    router.put('/:id', [DepartamentosController, 'update'])
    router.delete('/:id', [DepartamentosController, 'destroy'])
  })
  .prefix('/api/departamentos')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [EstadosSolicitacaoController, 'index'])
    router.get('/:id', [EstadosSolicitacaoController, 'show'])
    router.post('/', [EstadosSolicitacaoController, 'store'])
    router.put('/:id', [EstadosSolicitacaoController, 'update'])
    router.delete('/:id', [EstadosSolicitacaoController, 'destroy'])
  })
  .prefix('/api/estados-solicitacao')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [SolicitacoesController, 'index'])
    router.get('/minhas', [SolicitacoesController, 'minhas'])
    router.get('/:id', [SolicitacoesController, 'show'])
    router.post('/', [SolicitacoesController, 'store'])
    router.put('/:id', [SolicitacoesController, 'update'])
  })
  .prefix('/api/solicitacoes')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [TipoServicoController, 'index'])
    router.get('/:id', [TipoServicoController, 'show'])
    router.post('/', [TipoServicoController, 'store'])
    router.put('/:id', [TipoServicoController, 'update'])
    router.delete('/:id', [TipoServicoController, 'destroy'])
  })
  .prefix('/api/tipo_servicos')
  .use(middleware.auth())

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
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [ViaturasController, 'store'])
    router.get('/', [ViaturasController, 'listar'])
    router.get('/:id', [ViaturasController, 'show'])
    router.put('/:id', [ViaturasController, 'update'])
    router.delete('/:id', [ViaturasController, 'destroy'])
  })
  .prefix('/api/viaturas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/viatura/:viaturaId', [DocumentosViaturaController, 'index'])
    router.post('/', [DocumentosViaturaController, 'store'])
    router.put('/:id', [DocumentosViaturaController, 'update'])
    router.delete('/:id', [DocumentosViaturaController, 'destroy'])
    router.get('/documento/:filename', [DocumentosViaturaController, 'download'])
  })
  .prefix('/api/documentos-viatura')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/viatura/:viaturaId', [HistoricoQuilometragemController, 'index'])
    router.post('/', [HistoricoQuilometragemController, 'store'])
  })
  .prefix('/api/historico-quilometragem')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/viatura/:viaturaId', [AnexosViaturaController, 'index'])
    router.get('/download/:id', [AnexosViaturaController, 'download'])
    router.post('/', [AnexosViaturaController, 'store'])
    router.delete('/:id', [AnexosViaturaController, 'destroy'])
  })
  .prefix('/api/anexos-viatura')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [CondutoresController, 'index'])
    router.post('/', [CondutoresController, 'store'])
    router.get('/:id/historico-viaturas', [CondutoresController, 'historicoViaturas'])
    router.get('/:id', [CondutoresController, 'show'])
    router.put('/:id', [CondutoresController, 'update'])
    router.delete('/:id', [CondutoresController, 'destroy'])
  })
  .prefix('/api/condutores')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/condutor/:condutorId', [InfraccoesCondutorController, 'index'])
    router.post('/', [InfraccoesCondutorController, 'store'])
    router.delete('/:id', [InfraccoesCondutorController, 'destroy'])
  })
  .prefix('/api/infraccoes-condutor')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/condutor/:condutorId', [AvaliacoesCondutorController, 'index'])
    router.post('/', [AvaliacoesCondutorController, 'store'])
    router.delete('/:id', [AvaliacoesCondutorController, 'destroy'])
  })
  .prefix('/api/avaliacoes-condutor')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [ManutencaoAgendamentosController, 'index'])
    router.post('/', [ManutencaoAgendamentosController, 'store'])
    router.put('/:id', [ManutencaoAgendamentosController, 'update'])
  })
  .prefix('/api/manutencao-agendamentos')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/manutencao/:manutencaoId', [ManutencaoPecasController, 'index'])
    router.post('/', [ManutencaoPecasController, 'store'])
    router.delete('/:id', [ManutencaoPecasController, 'destroy'])
  })
  .prefix('/api/manutencao-pecas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [CartoesCombustivelController, 'index'])
    router.get('/:id', [CartoesCombustivelController, 'show'])
    router.post('/', [CartoesCombustivelController, 'store'])
    router.put('/:id', [CartoesCombustivelController, 'update'])
    router.delete('/:id', [CartoesCombustivelController, 'destroy'])
  })
  .prefix('/api/cartoes-combustivel')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/viatura/:viaturaId', [ConsumoCombustivelController, 'porViatura'])
    router.get('/frota', [ConsumoCombustivelController, 'frota'])
    router.get('/relatorio-custos', [ConsumoCombustivelController, 'relatorioCustos'])
  })
  .prefix('/api/consumo-combustivel')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AlertasController, 'index'])
    router.post('/gerar-notificacoes', [AlertasController, 'gerarNotificacoes'])
  })
  .prefix('/api/alertas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AuditLogsController, 'index'])
  })
  .prefix('/api/audit-logs')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [NotificacoesController, 'index'])
    router.put('/marcar-todas-lidas', [NotificacoesController, 'marcarTodasLidas'])
    router.put('/:id/lida', [NotificacoesController, 'marcarLida'])
  })
  .prefix('/api/notificacoes')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [AtendimentosFrotaController, 'store'])
    router.get('/', [AtendimentosFrotaController, 'index'])
    router.get('/:id', [AtendimentosFrotaController, 'show'])
    router.put('/:id', [AtendimentosFrotaController, 'finalizar'])
  })
  .prefix('/api/atendimentos-frotas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [ManutencoesController, 'index'])
    router.get('/:id', [ManutencoesController, 'show'])
    router.post('/', [ManutencoesController, 'store'])
    router.put('/finalizar/:id', [ManutencoesController, 'finalizar'])
    router.put('/:id/iniciar', [ManutencoesController, 'iniciar'])
    router.put('/:id', [ManutencoesController, 'update'])
    router.delete('/:id', [ManutencoesController, 'destroy'])
  })
  .prefix('/api/manutencao')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [AbastecimentosController, 'index'])
    router.get('/:id', [AbastecimentosController, 'show'])
    router.post('/', [AbastecimentosController, 'store'])
    router.put('/:id', [AbastecimentosController, 'update'])
    router.delete('/:id', [AbastecimentosController, 'destroy'])
  })
  .prefix('/api/abastecimentos')
  .use(middleware.auth())
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [DashboardController, 'index'])
    router.get('/relatorio', [RelatoriosController, 'index'])
    router.get('/custos-por-viatura', [DashboardController, 'custosPorViatura'])
    router.get('/disponibilidade', [DashboardController, 'disponibilidade'])
    router.get('/consumo-medio', [DashboardController, 'consumoMedio'])
  })
  .prefix('api/dashboard')
  .use(middleware.auth())
router.get('/swagger', async () => {
  return AutoSwagger.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.ui('/swagger', swagger)
})
