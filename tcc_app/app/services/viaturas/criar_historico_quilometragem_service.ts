import ViaturaRepository from '#repositories/viatura_repository'
import HistoricoQuilometragem from '#models/historico_quilometragem'
import db from '@adonisjs/lucid/services/db'

export default class CriarHistoricoQuilometragemService {
  constructor(private viaturaRepository = new ViaturaRepository()) {}

  async execute(payload: {
    viatura_id: number
    quilometragem: number
    data_registo: string
    origem?: string
    observacao?: string
  }) {
    const trx = await db.transaction()
    try {
      const registo = await HistoricoQuilometragem.create(
        {
          viaturaId: payload.viatura_id,
          quilometragem: payload.quilometragem,
          dataRegisto: payload.data_registo as any,
          origem: payload.origem || 'manual',
          observacao: payload.observacao || null,
        },
        { client: trx }
      )

      await this.viaturaRepository.actualizar(
        payload.viatura_id,
        { quilometragemActual: payload.quilometragem },
        trx
      )

      await trx.commit()
      return registo
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
