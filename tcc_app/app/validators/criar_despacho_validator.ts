import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  solicitacao_id: 'solicitacao',
  estado_solicitacao_id: 'estado da solicitacao',
  parecer: 'parecer',
}
export const criarDespachoValidator = vine.compile(
  vine.object({
    solicitacao_id: vine.number().exists(async (db, value) => {
      const row = await db.from('solicitacoes').where('id', value).first()

      return row
    }),
    estado_solicitacao_id: vine.number().exists(async (db, value) => {
      const row = await db.from('estados_solicitacao').where('id', value).first()

      return row
    }),
    parecer: vine.string().trim().minLength(5),
  })
)

export const criarDespachoValidationMessage = new SimpleMessagesProvider(
  {
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'email': 'O campo {{field}} não um endereco de  email',
    'email.unique': 'Ja existe {{field}} com existe campo',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',
  },
  fields
)
