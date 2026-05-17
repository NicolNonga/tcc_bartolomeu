import vine from '@vinejs/vine'

export const actualizarEstadoSolicitacaoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2).optional(),
    cor: vine.string().trim().optional(),
    descricao: vine.string().trim().optional(),
  })
)
