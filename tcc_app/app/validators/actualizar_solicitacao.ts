import vine from '@vinejs/vine'

export const actualizarSolicitacaoValidator = vine.compile(
  vine.object({
    estado_solicitacao_id: vine.number().optional(),
    observacao: vine.string().trim().optional(),
  })
)
