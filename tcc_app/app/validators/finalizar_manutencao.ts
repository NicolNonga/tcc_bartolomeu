import vine, { SimpleMessagesProvider } from '@vinejs/vine'
const fields = {
  data_saida: 'data de saida',
  custo: 'custo',
  observacao: 'observação',
}
export const finalizarManutencaoValidator = vine.compile(
  vine.object({
    data_saida: vine.date(),

    custo: vine.number().positive().optional(),

    observacao: vine.string().trim().optional(),
  })
)

export const finalizarManutencaoMessageValidor = new SimpleMessagesProvider(
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
