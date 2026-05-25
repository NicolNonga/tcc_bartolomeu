import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TipoServico from '#models/tipo_servico'

export default class extends BaseSeeder {
  async run() {
    await TipoServico.createMany([
      {
        nome: 'Transporte institucional',
        descricao: 'Deslocação oficial de funcionários',
      },
      {
        nome: 'Manutenção externa',
        descricao: 'Envio de viatura para oficina ou inspeção',
      },
      {
        nome: 'Abastecimento',
        descricao: 'Solicitação para abastecimento operacional',
      },
      {
        nome: 'Apoio logístico',
        descricao: 'Serviço de suporte e transporte interno',
      },
    ])
  }
}
