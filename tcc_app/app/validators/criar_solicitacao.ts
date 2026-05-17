import vine from '@vinejs/vine'
export const criarSolicitacaoValidator = vine.compile(
  vine.object({
    departamento_id: vine.number(),
    tipo_servico_id: vine.number(),
    descricao: vine.string().trim().minLength(5),
    data_necessidade: vine.string(),
    hora_necessidade: vine.string().optional(),
    local_saida: vine.string().trim().optional(),
    local_destino: vine.string().trim().optional(),
    prioridade: vine.enum(['baixa', 'media', 'alta', 'urgente']),
    observacao: vine.string().trim().optional(),
  })
)
