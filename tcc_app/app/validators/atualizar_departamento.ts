import vine from '@vinejs/vine'

export const actualizarDepartamentoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3).optional(),
    sigla: vine.string().trim().optional(),
    descricao: vine.string().trim().optional(),
  })
)
