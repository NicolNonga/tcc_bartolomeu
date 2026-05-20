import vine from '@vinejs/vine'
export const criarTipoServicoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3),
    descricao: vine.string().trim().optional(),
  })
)
