import vine from '@vinejs/vine'

export const criarInfraccaoValidator = vine.compile(
  vine.object({
    condutor_id: vine.number(),
    viatura_id: vine.number().optional(),
    data_infraccao: vine.string(),
    local: vine.string().trim().optional(),
    descricao: vine.string().trim(),
    gravidade: vine.enum(['leve', 'grave', 'muito_grave']).optional(),
    valor_multa: vine.number().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarAvaliacaoValidator = vine.compile(
  vine.object({
    condutor_id: vine.number(),
    avaliador_id: vine.number().optional(),
    data_avaliacao: vine.string(),
    pontuacao: vine.number().min(0).max(10),
    comentario: vine.string().trim().optional(),
  })
)
