import { BaseSeeder } from '@adonisjs/lucid/seeders'
import EstadoSolicitacao from '#models/estado_solicitacao'
import { DateTime } from 'luxon'

export default class EstadoSolicitacaoSeeder extends BaseSeeder {
  async run() {
    const estados = [
      {
        nome: 'Pendente',
        cor: '#f59e0b',
        descricao: 'Solicitação aguardando processamento',
      },
      {
        nome: 'Aprovada',
        cor: '#10b981',
        descricao: 'Solicitação aprovada',
      },
      {
        nome: 'Rejeitada',
        cor: '#ef4444',
        descricao: 'Solicitação rejeitada',
      },
      {
        nome: 'Em Andamento',
        cor: '#ef4444',
        descricao: 'Solicitação rejeitada',
      },
      {
        nome: 'Concluida',
        cor: '#10b981',
        descricao: 'Solicitação concluida',
      },
      {
        nome: 'Cancelada',
        cor: '#ef4444',
        descricao: 'Solicitação cancelada',
      },
    ]

    for (const estado of estados) {
      const exists = await EstadoSolicitacao.query().where('nome', estado.nome).first()

      if (!exists) {
        await EstadoSolicitacao.create({
          ...estado,
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
        })
      }
    }
  }
}
