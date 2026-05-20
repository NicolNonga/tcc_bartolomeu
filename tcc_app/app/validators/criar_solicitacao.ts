import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  departamento_id: 'departamento',
  tipo_servico_id: 'tipo de serviço',
  descricao: 'descricao',
  data_necessidade: 'data',
  hora_necessidade: 'hora',
  local_destino: 'local_destino',
  local_saida: 'local_saida',
  prioridade: 'prioridade',
  observacao: 'observacao',
}
export const criarSolicitacaoValidator = vine.compile(
  vine.object({
    departamento_id: vine.number().exists(async (db, value) => {
      const row = await db.from('departamentos').where('id', value).first()

      return row
    }),

    tipo_servico_id: vine.number().exists(async (db, value) => {
      const row = await db.from('tipos_servico').where('id', value).first()

      return row
    }),

    descricao: vine.string().trim().minLength(5),

    data_necessidade: vine.string(),

    hora_necessidade: vine.string().optional(),

    local_saida: vine.string().trim().optional(),

    local_destino: vine.string().trim().optional(),

    prioridade: vine.enum(['baixa', 'media', 'alta', 'urgente']),

    observacao: vine.string().trim().optional(),
  })
)
export const solicitacaoValidationMessage = new SimpleMessagesProvider(
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
