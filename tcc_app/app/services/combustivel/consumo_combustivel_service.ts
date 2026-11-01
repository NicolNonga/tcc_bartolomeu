import AbastecimentoRepository from '#repositories/abastecimento_repository'

type ConsumoRegisto = {
  abastecimento_id: number
  data: string
  km_percorridos: number
  litros: number
  consumo_km_litro: number
  anomalia: boolean
}

export default class ConsumoCombustivelService {
  constructor(private repository = new AbastecimentoRepository()) {}

  async calcularPorViatura(viaturaId: number) {
    const abastecimentos = await this.repository.listarPorViatura(viaturaId)
    const registos: ConsumoRegisto[] = []

    for (let i = 1; i < abastecimentos.length; i++) {
      const anterior = abastecimentos[i - 1]
      const actual = abastecimentos[i]
      const kmPercorridos =
        (actual.quilometragemRegistrada || 0) - (anterior.quilometragemRegistrada || 0)
      const litros = Number(actual.quantidadeLitros)

      if (kmPercorridos > 0 && litros > 0) {
        const consumo = kmPercorridos / litros
        registos.push({
          abastecimento_id: actual.id,
          data: actual.dataAbastecimento.toISODate() || '',
          km_percorridos: kmPercorridos,
          litros,
          consumo_km_litro: Number(consumo.toFixed(2)),
          anomalia: false,
        })
      }
    }

    if (registos.length > 1) {
      const media = registos.reduce((s, r) => s + r.consumo_km_litro, 0) / registos.length
      registos.forEach((r) => {
        const desvio = Math.abs(r.consumo_km_litro - media) / media
        r.anomalia = desvio > 0.3
      })
    }

    const consumoMedio =
      registos.length > 0
        ? Number(
            (registos.reduce((s, r) => s + r.consumo_km_litro, 0) / registos.length).toFixed(2)
          )
        : 0

    return { consumo_medio: consumoMedio, registos, anomalias: registos.filter((r) => r.anomalia) }
  }

  async consumoMedioFrota() {
    const Abastecimento = (await import('#models/abastecimento')).default
    const viaturas = await Abastecimento.query().distinct('viatura_id')
    const resultados = []

    for (const { viaturaId } of viaturas) {
      const dados = await this.calcularPorViatura(viaturaId)
      if (dados.consumo_medio > 0) {
        resultados.push({ viatura_id: viaturaId, consumo_medio: dados.consumo_medio })
      }
    }

    const mediaFrota =
      resultados.length > 0
        ? Number(
            (
              resultados.reduce((s, r) => s + r.consumo_medio, 0) / resultados.length
            ).toFixed(2)
          )
        : 0

    return { media_frota: mediaFrota, por_viatura: resultados }
  }
}
