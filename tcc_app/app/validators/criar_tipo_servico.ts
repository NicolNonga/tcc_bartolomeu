import vine from '@vinejs/vine'
export const criarTipoServicoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3),
    sigla: vine.string().trim().optional(),
    descricao: vine.string().trim().optional(),
  })
)
