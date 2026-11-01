import vine from '@vinejs/vine'

export const criarManutencaoAgendamentoValidator = vine.compile(
  vine.object({
    viatura_id: vine.number(),
    descricao: vine.string().trim(),
    tipo_agendamento: vine.enum(['por_km', 'por_data']),
    quilometragem_alvo: vine.number().optional(),
    data_alvo: vine.string().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarManutencaoPecaValidator = vine.compile(
  vine.object({
    manutencao_id: vine.number(),
    nome_peca: vine.string().trim(),
    quantidade: vine.number().optional(),
    custo_unitario: vine.number(),
    observacao: vine.string().trim().optional(),
  })
)
