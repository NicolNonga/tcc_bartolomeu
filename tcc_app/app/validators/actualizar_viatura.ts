import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  matricula: 'matricula',
  marca: 'marca',
  modelo: 'modelo',
  ano_fabrico: 'ano de fabrico',
  numero_chassi: 'numero chassi',
  cor: 'cor',
  tipo_combustivel: 'tipo_combustivel',
  categoria: 'categoria',
  capacidade: 'capacidade',
  quilometragem_actual: 'quilometragem actual',
  estado_operacional: 'estado operacional',
  estado_viatura: 'estado viatura',
  condutor_responsavel_id: 'condutor responsavel',
  observacao: 'observacao',
}

export const actualizarViaturaValidator = vine.compile(
  vine.object({
    matricula: vine.string().trim().optional(),
    marca: vine.string().trim().optional(),
    modelo: vine.string().trim().optional(),
    ano_fabrico: vine.number().optional(),
    numero_chassi: vine.string().trim().optional(),
    cor: vine.string().trim().optional(),
    tipo_combustivel: vine.enum(['gasolina', 'diesel', 'electrico', 'hibrido']).optional(),
    categoria: vine.enum(['ligeiro', 'pesado', 'moto', 'autocarro', 'outro']).optional(),
    capacidade: vine.number().optional(),
    quilometragem_actual: vine.number().optional(),
    estado_operacional: vine
      .enum(['disponivel', 'em_servico', 'em_manutencao', 'inativa'])
      .optional(),
    estado_viatura: vine.enum(['activo', 'em_manutencao', 'abatido', 'vendido']).optional(),
    condutor_responsavel_id: vine.number().nullable().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const actualizarViaturaMessages = new SimpleMessagesProvider(
  {
    'required': 'O {{ field }} é obrigatorio',
    'database.exists': ' O {{field}}  nao encontrado',
    'database.unique': 'Ja  existe um {{field}} cadastrado',
  },
  fields
)
