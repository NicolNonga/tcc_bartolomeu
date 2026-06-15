import AbastecimentoRepository from '#repositories/abastecimento_repository'
import ViaturaRepository from '#repositories/viatura_repository'
import db from '@adonisjs/lucid/services/db'

export default class CriarAbastecimentoService {
  constructor(
    private abastecimentoRepository = new AbastecimentoRepository(),
    private viaturaRepository = new ViaturaRepository()
  ) {}

  async execute(payload: any) {
    const trx = await db.transaction()
    try {
      const abastecimento = await this.abastecimentoRepository.criar(payload, trx)

      if (payload.quilometragem_registrada) {
        await this.viaturaRepository.actualizar(
          payload.viatura_id,
          {
            quilometragemActual: payload.quilometragem_registrada,
          },
          trx
        )
      }
      await trx.commit()
      return abastecimento
    } catch (error) {
      await trx.rollback()
    }
  }
}
