import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'
export const fields = {
  solicitacao_id: 'solicitacao',
  nome_documento: 'nome do documento',
  descricao: 'descricao',
}
export const criarDocumentoSolicitacaoValidator = vine.compile(
  vine.object({
    solicitacao_id: vine.number().exists(async (db, value) => {
      const row = await db.from('solicitacoes').where('id', value).first()

      return row
    }),
    nome_documento: vine.string().trim().minLength(3),
    descricao: vine.string().trim().optional(),
  })
)

export const criarDocumentoSolicitacaoValidationMessage = new SimpleMessagesProvider(
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
