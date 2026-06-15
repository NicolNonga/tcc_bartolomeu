import RelatorioGeralRepository from '#repositories/relatorio_geral_repository'

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const mapMes = <T extends { mes: number }>(items: T[]) =>
  items.map((item) => ({ ...item, mes: MESES[item.mes - 1] }))

export default class RelatoriosService {
  constructor(private repository = new RelatorioGeralRepository()) {}

  async execute() {
    const [solicitacoesPorMes, abastecimentoPorMes, manutencaoPorViatura, viaturasMaisUtilizadas] =
      await Promise.all([
        this.repository.solicitacoesPorMes(),
        this.repository.abastecimentoPorMes(),
        this.repository.manutencaoPorViatura(),
        this.repository.viaturasMaisUtilizadas(),
      ])

    return {
      solicitacoesPorMes: mapMes(solicitacoesPorMes),
      abastecimentoPorMes: mapMes(abastecimentoPorMes),
      manutencaoPorViatura,
      viaturasMaisUtilizadas,
    }
  }
}
