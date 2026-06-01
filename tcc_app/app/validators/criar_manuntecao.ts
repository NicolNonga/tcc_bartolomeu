import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  viatura_id: 'viatura',
  tipo_manutencao: 'tipo de manutenção',
  descricao: 'descrição',
  data_entrada: 'data de entrada',
  data_saida: 'data de saida',
  quilometragem_manutencao: 'quilomentragem',
  custo: 'custo',
  observacao: 'observação',
}
export const createManutencaoValidator = vine.compile(
  vine.object({
    viatura_id: vine.number().exists(async (db, value) => {
      const row = await db.from('viaturas').where('id', value).first()

      return row
    }),

    tipo_manutencao: vine.enum(['preventiva', 'correctiva', 'inspecao']),

    descricao: vine.string().trim(),

    oficina: vine.string().trim().optional(),

    data_entrada: vine.date(),

    data_saida: vine.date().optional(),

    quilometragem_manutencao: vine.number().optional(),

    custo: vine.number().optional(),

    observacao: vine.string().trim().optional(),
  })
)
export const criarManutencaoValidatorMessage = new SimpleMessagesProvider(
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
