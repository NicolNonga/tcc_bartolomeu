import vine from '@vinejs/vine'

export const criarEstadoSolicitacaoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2),
    cor: vine.string().trim().optional(),
    descricao: vine.string().trim().optional(),
  })
)
