import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Viatura from '#models/viatura'

export default class extends BaseSeeder {
  async run() {
    await Viatura.updateOrCreateMany('matricula', [
      {
        matricula: 'LD-12-34-AB',
        marca: 'Toyota',
        modelo: 'Hilux',
        anoFabrico: 2022,
        numeroChassi: 'JTFRD5GG200123456',
        cor: 'Branco',
        tipoCombustivel: 'diesel',
        categoria: 'ligeiro',
        capacidade: 5,
        quilometragemActual: 45000,
        estadoOperacional: 'disponivel',
        estadoViatura: 'activo',
        observacao: 'Viatura de serviço geral',
      },
      {
        matricula: 'LD-56-78-CD',
        marca: 'Mercedes-Benz',
        modelo: 'Sprinter',
        anoFabrico: 2020,
        numeroChassi: 'WDB9066331N123456',
        cor: 'Prata',
        tipoCombustivel: 'diesel',
        categoria: 'pesado',
        capacidade: 16,
        quilometragemActual: 120000,
        estadoOperacional: 'disponivel',
        estadoViatura: 'activo',
        observacao: 'Transporte de pessoal',
      },
      {
        matricula: 'LD-90-12-EF',
        marca: 'Honda',
        modelo: 'CB500X',
        anoFabrico: 2023,
        numeroChassi: 'JH2PC5000MK123456',
        cor: 'Vermelho',
        tipoCombustivel: 'gasolina',
        categoria: 'moto',
        capacidade: 2,
        quilometragemActual: 8500,
        estadoOperacional: 'disponivel',
        estadoViatura: 'activo',
      },
      {
        matricula: 'LD-34-56-GH',
        marca: 'Hyundai',
        modelo: 'County',
        anoFabrico: 2019,
        numeroChassi: 'KMJRC18CPLU123456',
        cor: 'Amarelo',
        tipoCombustivel: 'diesel',
        categoria: 'autocarro',
        capacidade: 30,
        quilometragemActual: 185000,
        estadoOperacional: 'em_manutencao',
        estadoViatura: 'activo',
        observacao: 'Autocarro escolar',
      },
    ])
  }
}
