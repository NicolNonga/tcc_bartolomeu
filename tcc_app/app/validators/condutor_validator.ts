import vine from '@vinejs/vine'

export const criarCondutorValidator = vine.compile(
  vine.object({
    user_id: vine.number().optional(),
    numero_carta: vine.string().trim(),
    categoria_carta: vine.enum(['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE']),
    validade_carta: vine.string(),
    telefone: vine.string().trim().optional(),
    data_nascimento: vine.string().optional(),
    morada: vine.string().trim().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const actualizarCondutorValidator = vine.compile(
  vine.object({
    user_id: vine.number().optional(),
    numero_carta: vine.string().trim().optional(),
    categoria_carta: vine.enum(['A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE']).optional(),
    validade_carta: vine.string().optional(),
    telefone: vine.string().trim().optional(),
    data_nascimento: vine.string().optional(),
    morada: vine.string().trim().optional(),
    observacao: vine.string().trim().optional(),
    is_active: vine.boolean().optional(),
  })
)
