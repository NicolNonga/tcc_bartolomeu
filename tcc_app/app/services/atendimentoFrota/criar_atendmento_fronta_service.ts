import AtendimentoFrotaRepository from '#repositories/atendimento_frota_repository'
import ViaturaRepository from '#repositories/viatura_repository'
import SolicitacaoRepository from '#repositories/SolicitacaoRepository'
import { EstadoOperacional } from '../../enum/viatura_enum.js'
import db from '@adonisjs/lucid/services/db'

export default class CriarAtendimentoFrotaService {
  constructor(
    private atendimentoRepository = new AtendimentoFrotaRepository(),
    private viaturaRepository = new ViaturaRepository(),
    private solicitacaoRepository = new SolicitacaoRepository()
  ) {}

  async execute(payload: any) {
    const trx = await db.transaction()
    try {
      const atendimento = await this.atendimentoRepository.criar(
        {
          ...payload,
          estado_atendimento: 'agendado',
        },
        trx
      )

      await this.viaturaRepository.actualizar(
        payload.viatura_id,
        {
          estadoOperacional: EstadoOperacional.EM_SERVICO,
        },
        trx
      )

      await this.solicitacaoRepository.actualizar(
        payload.solicitacao_id,
        {
          estadoSolicitacaoId: 4,
        },
        trx
      )

      await trx.commit()
      return atendimento
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
