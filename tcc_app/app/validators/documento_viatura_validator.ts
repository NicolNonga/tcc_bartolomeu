import vine from '@vinejs/vine'

export const criarDocumentoViaturaValidator = vine.compile(
  vine.object({
    viatura_id: vine.number(),
    tipo_documento: vine.enum(['seguro', 'inspeccao', 'licenca_circulacao']),
    numero_documento: vine.string().trim().optional(),
    entidade_emissora: vine.string().trim().optional(),
    data_emissao: vine.string().optional(),
    data_validade: vine.string(),
    observacao: vine.string().trim().optional(),
  })
)

export const actualizarDocumentoViaturaValidator = vine.compile(
  vine.object({
    tipo_documento: vine.enum(['seguro', 'inspeccao', 'licenca_circulacao']).optional(),
    numero_documento: vine.string().trim().optional(),
    entidade_emissora: vine.string().trim().optional(),
    data_emissao: vine.string().optional(),
    data_validade: vine.string().optional(),
    observacao: vine.string().trim().optional(),
  })
)

export const criarHistoricoQuilometragemValidator = vine.compile(
  vine.object({
    viatura_id: vine.number(),
    quilometragem: vine.number(),
    data_registo: vine.string(),
    origem: vine.string().trim().optional(),
    observacao: vine.string().trim().optional(),
  })
)
