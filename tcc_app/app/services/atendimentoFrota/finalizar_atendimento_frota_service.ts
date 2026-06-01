import AtendimentoFrotaRepository from '#repositories/atendimento_frota_repository'
import ViaturaRepository from '#repositories/viatura_repository'
import SolicitacaoRepository from '#repositories/SolicitacaoRepository'
import { EstadoOperacional } from '../../enum/viatura_enum.js'
import db from '@adonisjs/lucid/services/db'

export default class FinalizarAtendimentoFrotaService {
  constructor(
    private atendimentoRepository = new AtendimentoFrotaRepository(),
    private viaturaRepository = new ViaturaRepository(),
    private solicitacaoRepository = new SolicitacaoRepository()
  ) {}

  async execute(id: number, payload: any) {
    const trx = await db.transaction()
    try {
      const atendimento = await this.atendimentoRepository.actualizar(id, {
        ...payload,
        dataRetorno: payload.data_retorno,
        horaRetorno: payload.hora_retorno,
        quilometragemRetorno: payload.quilometragem_retorno,
        estadoAtendimento: 'concluido',
        observacao: payload.observacao,
      })

      if (!atendimento) {
        return null
      }

      await this.viaturaRepository.actualizar(atendimento.viaturaId, {
        estadoOperacional: EstadoOperacional.DISPONIVEL,
        quilometragemActual: payload.quilometragem_retorno,
      })

      await this.solicitacaoRepository.actualizar(atendimento.solicitacaoId, {
        estadoSolicitacaoId: 5,
      })

      await trx.commit()
      return atendimento
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
