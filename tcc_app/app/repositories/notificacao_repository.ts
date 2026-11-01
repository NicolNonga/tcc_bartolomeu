import Notificacao from '#models/notificacao'
import { DateTime } from 'luxon'

export default class NotificacaoRepository {
  async criar(dados: Partial<Notificacao>) {
    return Notificacao.create(dados)
  }

  async listarPorUser(userId: number, apenasNaoLidas = false) {
    const query = Notificacao.query().where('user_id', userId).orderBy('id', 'desc')
    if (apenasNaoLidas) query.whereNull('lida_em')
    return query.limit(100)
  }

  async existeRecente(
    userId: number,
    tipo: string,
    entidade: string,
    entidadeId: number,
    dias = 7
  ) {
    const limite = DateTime.now().minus({ days: dias })
    const existe = await Notificacao.query()
      .where('user_id', userId)
      .where('tipo', tipo)
      .where('entidade', entidade)
      .where('entidade_id', entidadeId)
      .where('created_at', '>=', limite.toSQL()!)
      .first()

    return !!existe
  }

  async marcarComoLida(id: number, userId: number) {
    const notificacao = await Notificacao.query()
      .where('id', id)
      .where('user_id', userId)
      .firstOrFail()
    notificacao.lidaEm = DateTime.now()
    await notificacao.save()
    return notificacao
  }

  async marcarTodasComoLidas(userId: number) {
    await Notificacao.query()
      .where('user_id', userId)
      .whereNull('lida_em')
      .update({ lida_em: DateTime.now().toSQL() })
  }
}
