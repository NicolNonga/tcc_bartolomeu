import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  data_retorno: 'data de retorno',
  hora_retorno: 'hora de retorno',
  quilometragem_retorno: 'quilometragem de retorno',
  observacao: 'observacao',
}
export const finalizarAtendimentoFrotaValidator = vine.compile(
  vine.object({
    data_retorno: vine.string(),
    hora_retorno: vine.string(),
    quilometragem_retorno: vine.number(),
    observacao: vine.string().trim().optional(),
  })
)
export const finalizarAtendimentoFrotaValidationMessage = new SimpleMessagesProvider(
  {
    'required': 'O {{ field }} é obrigatorio',
    'string': 'The value of {{ field }} field must be a string',
    'database.exists': ' O {{field}}  nao encontrado',
  },
  fields
)
