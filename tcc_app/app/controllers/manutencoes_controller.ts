import ManutencaoRepository from '#repositories/manutencao_repository'
import CriarManutencaoService from '#services/manutencao/criar_manutencao_service'
import FinalizarManutencaoService from '#services/manutencao/finalizar_manutencao_service'
import {
  actualizarManutencaoValidator,
  createManutencaoValidator,
  criarManutencaoValidatorMessage,
} from '#validators/criar_manuntecao'
import {
  finalizarManutencaoMessageValidor,
  finalizarManutencaoValidator,
} from '#validators/finalizar_manutencao'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import ViaturaRepository from '#repositories/viatura_repository'
import { EstadoOperacional } from '../enum/viatura_enum.js'

export default class ManutencoesController {
  constructor(
    private manuntecaoRepository = new ManutencaoRepository(),
    private criarManuntecaoService = new CriarManutencaoService(),
    private finalizarManutencaoService = new FinalizarManutencaoService()
  ) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createManutencaoValidator, {
      messagesProvider: criarManutencaoValidatorMessage,
    })
    await this.criarManuntecaoService.execute(payload)
    return response.created({
      message: 'manutencao criada com sucesso',
    })
  }

  async index({ response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.listar()
    return response.ok({ data: manutencao })
  }
  async show({ params, response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.buscarPorId(params.id)

    if (!manutencao) {
      return response.notFound({
        message: 'manutencao nao encontrada',
      })
    }
    return response.ok({ data: manutencao })
  }

  async finalizar({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(finalizarManutencaoValidator, {
      messagesProvider: finalizarManutencaoMessageValidor,
    })
    const manutencao = await this.finalizarManutencaoService.execute(params.id, payload)

    if (!manutencao) {
      return response.notFound({
        message: 'manutencao nao encontrada',
      })
    }

    return response.ok({ message: 'manutenção finalizad com sucesso' })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(actualizarManutencaoValidator)
    const existente = await this.manuntecaoRepository.buscarPorId(params.id)
    if (!existente) return response.notFound({ message: 'manutencao nao encontrada' })
    if (['concluida', 'cancelada'].includes(existente.estadoManutencao)) {
      return response.badRequest({ message: 'Manutenção já fechada não pode ser editada' })
    }

    const { data_entrada: dataEntrada, proxima_revisao_data: proximaData, ...resto } = payload
    const dados: Record<string, unknown> = { ...resto }
    if (dataEntrada) dados.dataEntrada = DateTime.fromJSDate(dataEntrada)
    if (proximaData) dados.proximaRevisaoData = DateTime.fromJSDate(proximaData).toISODate()

    const manutencao = await this.manuntecaoRepository.actualizar(params.id, dados as any)
    return response.ok({ message: 'manutenção actualizada com sucesso', data: manutencao })
  }

  /** aberta -> em_execucao (ordem de serviço em curso). */
  async iniciar({ params, response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.buscarPorId(params.id)
    if (!manutencao) return response.notFound({ message: 'manutencao nao encontrada' })
    if (manutencao.estadoManutencao !== 'aberta') {
      return response.badRequest({ message: 'Só uma manutenção aberta pode ser iniciada' })
    }
    await this.manuntecaoRepository.actualizar(params.id, { estadoManutencao: 'em_execucao' })
    return response.ok({ message: 'manutenção em execução' })
  }

  async destroy({ params, response }: HttpContext) {
    const manutencao = await this.manuntecaoRepository.buscarPorId(params.id)
    if (!manutencao) return response.notFound({ message: 'manutencao nao encontrada' })

    const trx = await db.transaction()
    try {
      await this.manuntecaoRepository.remover(params.id, trx)
      // Se a OS ainda estava em curso, a viatura volta a ficar disponível.
      if (['aberta', 'em_execucao'].includes(manutencao.estadoManutencao)) {
        await new ViaturaRepository().actualizar(
          manutencao.viaturaId,
          { estadoOperacional: EstadoOperacional.DISPONIVEL },
          trx
        )
      }
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
    return response.ok({ message: 'manutenção removida com sucesso' })
  }
}
