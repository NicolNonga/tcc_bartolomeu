import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  viatura_id: 'viatura',
  data_abastecimento: 'data de abasticmento',
  tipo_combustivel: 'tipo de combustivel',
  quantidade_litros: 'quantidade de litros',
  posto_abastecimento: 'posto de abasticmento',
  observacao: 'observação',
  valor_total: 'valor total',
}
export const criarAbastecimentoValidator = vine.compile(
  vine.object({
    viatura_id: vine.number().exists(async (db, value) => {
      const row = await db.from('viaturas').where('id', value).first()

      return row
    }),
    data_abastecimento: vine.string(),
    tipo_combustivel: vine.enum(['gasolina', 'diesel', 'electrico', 'hibrido']),
    quantidade_litros: vine.number(),
    valor_total: vine.number(),
    quilometragem_registrada: vine.number().optional(),
    posto_abastecimento: vine.string().trim().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarAbastcimentoValidatorMessage = new SimpleMessagesProvider(
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
