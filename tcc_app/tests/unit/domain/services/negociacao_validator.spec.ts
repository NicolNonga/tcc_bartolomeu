import { test } from '@japa/runner'
import { NegociacaoValidator } from '../../../../app/domain/services/negociacao_validator.js'
import { ErroValidacaoNegociacao } from '../../../../app/domain/errors/erro_negociacao.js'
import { CriarNegociacaoInput } from '../../../../app/domain/repositories/inegociation_repository.js'

test.group('NegociacaoValidator', () => {
  const dadosValidos: CriarNegociacaoInput = {
    valorDivida: 1000,
    valorDesconto: 100,
    taxaDesconto: 10,
    valorTotal: 900,
    valorFinal: 900,
    dataEfetiva: new Date('2024-01-01'),
    dataInicio: new Date('2024-01-01'),
    dataFim: new Date('2024-12-31'),
    eParcelado: false,
    isParcelaIgual: false,
    processos: [{ id: 1 }]
  }

  test('deve validar negociação válida sem parcelas', ({ assert }) => {
    assert.doesNotThrow(() => {
      NegociacaoValidator.validar(dadosValidos)
    })
  })

  test('deve rejeitar data início posterior à data fim', ({ assert }) => {
    const dados = {
      ...dadosValidos,
      dataInicio: new Date('2024-12-31'),
      dataFim: new Date('2024-01-01')
    }

    assert.throws(
      () => NegociacaoValidator.validar(dados),
      ErroValidacaoNegociacao,
      'A data de início deve ser anterior à data fim'
    )
  })

  test('deve rejeitar data efetiva futura', ({ assert }) => {
    const amanha = new Date()
    amanha.setDate(amanha.getDate() + 1)

    const dados = {
      ...dadosValidos,
      dataEfetiva: amanha
    }

    assert.throws(
      () => NegociacaoValidator.validar(dados),
      ErroValidacaoNegociacao,
      'A data efetiva não pode ser futura'
    )
  })

  test('deve rejeitar negociação sem processos', ({ assert }) => {
    const dados = {
      ...dadosValidos,
      processos: []
    }

    assert.throws(
      () => NegociacaoValidator.validar(dados),
      ErroValidacaoNegociacao,
      'A negociação deve ter pelo menos um processo associado'
    )
  })

  test('deve validar negociação parcelada válida', ({ assert }) => {
    const dados = {
      ...dadosValidos,
      eParcelado: true,
      totalParcelas: 2,
      parcelas: [
        {
          numeroParcela: 1,
          valorParcela: 450,
          valorPercentual: 50,
          dataVencimento: new Date('2024-06-01'),
          percentualMulta: 2
        },
        {
          numeroParcela: 2,
          valorParcela: 450,
          valorPercentual: 50,
          dataVencimento: new Date('2024-12-01'),
          percentualMulta: 2
        }
      ]
    }

    assert.doesNotThrow(() => {
      NegociacaoValidator.validar(dados)
    })
  })

  test('deve rejeitar parcelas com soma incorreta', ({ assert }) => {
    const dados = {
      ...dadosValidos,
      eParcelado: true,
      parcelas: [
        {
          numeroParcela: 1,
          valorParcela: 400, // Soma = 800, mas valorTotal = 900
          valorPercentual: 44.44,
          dataVencimento: new Date('2024-06-01'),
          percentualMulta: 2
        },
        {
          numeroParcela: 2,
          valorParcela: 400,
          valorPercentual: 44.44,
          dataVencimento: new Date('2024-12-01'),
          percentualMulta: 2
        }
      ]
    }

    assert.throws(
      () => NegociacaoValidator.validar(dados),
      ErroValidacaoNegociacao
    )
  })
})
