import { BaseSeeder } from '@adonisjs/lucid/seeders'

// Write your database queries inside the run method

import Departamento from '#models/departamento'

export default class extends BaseSeeder {
  async run() {
    await Departamento.createMany([
      {
        nome: 'Departamento Administrativo',
        sigla: 'DA',
        descricao: 'Gestão administrativa geral',
      },
      {
        nome: 'Departamento Financeiro',
        sigla: 'DF',
        descricao: 'Gestão financeira',
      },
      {
        nome: 'Departamento Técnico',
        sigla: 'DT',
        descricao: 'Operações técnicas',
      },
      {
        nome: 'Departamento de Logística',
        sigla: 'DL',
        descricao: 'Suporte logístico e transportes',
      },
    ])
  }
}
