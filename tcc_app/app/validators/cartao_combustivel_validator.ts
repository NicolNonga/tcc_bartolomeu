import vine from '@vinejs/vine'

export const criarCartaoCombustivelValidator = vine.compile(
  vine.object({
    numero_cartao: vine.string().trim(),
    fornecedor: vine.string().trim().optional(),
    viatura_id: vine.number().optional(),
    condutor_id: vine.number().optional(),
    limite_mensal: vine.number().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const actualizarCartaoCombustivelValidator = vine.compile(
  vine.object({
    numero_cartao: vine.string().trim().optional(),
    fornecedor: vine.string().trim().optional(),
    viatura_id: vine.number().optional(),
    condutor_id: vine.number().optional(),
    limite_mensal: vine.number().optional(),
    is_active: vine.boolean().optional(),
    observacao: vine.string().trim().optional(),
  })
)
