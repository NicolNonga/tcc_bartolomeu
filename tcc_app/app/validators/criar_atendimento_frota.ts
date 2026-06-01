import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  solicitacao_id: 'solicitacao',
  viatura_id: 'viatura',
  motorista_id: 'motorista',
  data_saida: 'data de saida',
  hora_saida: 'hora de saida',
  quilometragem_saida: 'quilometragem de saida',
  observacao: 'observacao',
}
export const criarAtendimentoFrotaValidator = vine.compile(
  vine.object({
    solicitacao_id: vine.number().exists(async (db, value) => {
      const solicitacao = await db.from('solicitacoes').where('id', value).first()
      return solicitacao
    }),
    viatura_id: vine.number().exists(async (db, value) => {
      const viatura = await db.from('viaturas').where('id', value).first()
      return viatura
    }),
    motorista_id: vine.number().exists(async (db, value) => {
      const motorista = await db.from('users').where('id', value).first()
      return motorista
    }),
    data_saida: vine.string(),
    hora_saida: vine.string(),
    quilometragem_saida: vine.number().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarAtendimentoFrotaValidationMessage = new SimpleMessagesProvider(
  {
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'database.exists': ' O {{field}}  nao encontrado',
  },
  fields
)
