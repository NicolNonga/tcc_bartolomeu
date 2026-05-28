import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  matricula: 'matricula',
  marca: 'marca',
  modelo: 'modelo',
  ano_fabrico: 'ano de fabrico',
  numero_chassi: 'numero chassi',
  cor: 'cor',
  tipo_combustivel: 'tipo_combustivel',
  quilometragem_actual: 'quilometragem actual',
  estado_operacional: 'estado operacional',
  observacao: 'observacao',
}
export const criarViaturaValidator = vine.compile(
  vine.object({
    matricula: vine.string().trim(),
    marca: vine.string().trim(),
    modelo: vine.string().trim(),
    ano_fabrico: vine.number().optional(),
    numero_chassi: vine.string().trim().optional(),
    cor: vine.string().trim().optional(),
    tipo_combustivel: vine.enum(['gasolina', 'diesel', 'electrico', 'hibrido']).optional(),
    quilometragem_actual: vine.number().optional(),
    estado_operacional: vine
      .enum(['disponivel', 'em_servico', 'em_manutencao', 'inativa'])
      .optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarViaturaValidorMassage = new SimpleMessagesProvider(
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
