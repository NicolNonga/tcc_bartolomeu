import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RoleSeeder from './role_seeder.js'
import RoleFrotaSeeder from './role_frota_seeder.js'
import PermissionSeeder from './permission_seeder.js'
import UserSeeder from './user_seeder.js'
import UserFrotaSeeder from './user_frota_seeder.js'
import DepartamentoSeeder from './departamento_seeder.js'
import TipoServicoSeeder from './tipo_servico_seeder.js'
import EstadoSolicitacaoSeeder from './estado_solicitacao_seeder.js'
import ViaturaSeeder from './viatura_seeder.js'
import CondutorSeeder from './condutor_seeder.js'
import FleetDataSeeder from './fleet_data_seeder.js'

export default class extends BaseSeeder {
  // O Lucid não tem `this.call`: instanciamos cada seeder com a mesma ligação.
  private async executar(Seeder: new (client: typeof this.client) => BaseSeeder) {
    await new Seeder(this.client).run()
  }

  async run() {
    await this.executar(RoleSeeder)
    await this.executar(RoleFrotaSeeder)
    await this.executar(PermissionSeeder)
    await this.executar(UserSeeder)
    await this.executar(UserFrotaSeeder)
    await this.executar(DepartamentoSeeder)
    await this.executar(TipoServicoSeeder)
    await this.executar(EstadoSolicitacaoSeeder)
    await this.executar(ViaturaSeeder)
    await this.executar(CondutorSeeder)
    await this.executar(FleetDataSeeder)
  }
}
