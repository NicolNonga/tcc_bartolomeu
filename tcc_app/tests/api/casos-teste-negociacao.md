# Casos de Teste para API de Negociação

## Endpoint: POST /api/negotiations

### Casos de Sucesso

#### 1. Negociação Simples (Não Parcelada)
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 201 Created com dados da negociação criada

#### 2. Negociação Parcelada com Parcelas Iguais
```json
{
  "debtAmount": 2000.00,
  "discountAmount": 200.00,
  "discountRate": 10.0,
  "totalAmount": 1800.00,
  "finalAmount": 1800.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": true,
  "totalInstallments": 3,
  "processes": [
    { "id": 1 }
  ],
  "installmentments": [
    {
      "installmentNumber": 1,
      "installmentAmount": 600.00,
      "installmentPercentage": 33.33,
      "dueDate": "2024-04-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 2,
      "installmentAmount": 600.00,
      "installmentPercentage": 33.33,
      "dueDate": "2024-07-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 3,
      "installmentAmount": 600.00,
      "installmentPercentage": 33.34,
      "dueDate": "2024-10-15",
      "penaltyPercentage": 2.0
    }
  ]
}
```
**Resultado Esperado**: 201 Created

#### 3. Negociação Parcelada com Parcelas Diferentes
```json
{
  "debtAmount": 3000.00,
  "discountAmount": 300.00,
  "discountRate": 10.0,
  "totalAmount": 2700.00,
  "finalAmount": 2700.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": false,
  "totalInstallments": 3,
  "processes": [
    { "id": 1 },
    { "id": 2 }
  ],
  "installmentments": [
    {
      "installmentNumber": 1,
      "installmentAmount": 1350.00,
      "installmentPercentage": 50.0,
      "dueDate": "2024-04-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 2,
      "installmentAmount": 810.00,
      "installmentPercentage": 30.0,
      "dueDate": "2024-07-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 3,
      "installmentAmount": 540.00,
      "installmentPercentage": 20.0,
      "dueDate": "2024-10-15",
      "penaltyPercentage": 2.0
    }
  ]
}
```
**Resultado Esperado**: 201 Created

### Casos de Erro de Validação

#### 4. Erro: Data de Início Posterior à Data Fim
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-12-31",
  "endDate": "2024-01-15",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "A data de início deve ser anterior à data fim",
  "type": "validation_error"
}
```

#### 5. Erro: Data Efetiva Futura
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2025-12-31",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "A data efetiva não pode ser futura",
  "type": "validation_error"
}
```

#### 6. Erro: Valor Total Incorreto
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 950.00,
  "finalAmount": 950.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "O valor total (950.00) deve ser igual ao valor da dívida (1000.00) menos o desconto (100.00) = 900.00",
  "type": "validation_error"
}
```

#### 7. Erro: Negociação Sem Processos
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": []
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "A negociação deve ter pelo menos um processo associado",
  "type": "validation_error"
}
```

#### 8. Erro: Parcelada Sem Parcelas
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "Negociação parcelada deve ter pelo menos uma parcela",
  "type": "validation_error"
}
```

#### 9. Erro: Soma das Parcelas Incorreta
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": false,
  "totalInstallments": 2,
  "processes": [
    { "id": 1 }
  ],
  "installmentments": [
    {
      "installmentNumber": 1,
      "installmentAmount": 400.00,
      "installmentPercentage": 44.44,
      "dueDate": "2024-06-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 2,
      "installmentAmount": 400.00,
      "installmentPercentage": 44.44,
      "dueDate": "2024-12-15",
      "penaltyPercentage": 2.0
    }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "A soma das parcelas (800.00) deve ser igual ao valor total (900.00)",
  "type": "validation_error"
}
```

#### 10. Erro: Parcelas com Valores Diferentes quando Marcadas como Iguais
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": true,
  "totalInstallments": 2,
  "processes": [
    { "id": 1 }
  ],
  "installmentments": [
    {
      "installmentNumber": 1,
      "installmentAmount": 450.00,
      "installmentPercentage": 50.0,
      "dueDate": "2024-06-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 2,
      "installmentAmount": 450.01,
      "installmentPercentage": 50.0,
      "dueDate": "2024-12-15",
      "penaltyPercentage": 2.0
    }
  ]
}
```
**Resultado Esperado**: 400 Bad Request
```json
{
  "message": "Erro de validação",
  "error": "Parcelas devem ter valores iguais (R$ 450.00). Parcelas diferentes: 2",
  "type": "validation_error"
}
```

### Casos de Erro de Dados

#### 11. Erro: Processo Inexistente
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "discountRate": 10.0,
  "totalAmount": 900.00,
  "finalAmount": 900.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 99999 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request (erro de validação do Vine)

#### 12. Erro: Campos Obrigatórios Ausentes
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 100.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 400 Bad Request (campos obrigatórios ausentes)

### Casos Limite

#### 13. Negociação com Valor Mínimo
```json
{
  "debtAmount": 0.01,
  "discountAmount": 0.00,
  "discountRate": 0.0,
  "totalAmount": 0.01,
  "finalAmount": 0.01,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-01-16",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 201 Created

#### 14. Negociação com Desconto Máximo (100%)
```json
{
  "debtAmount": 1000.00,
  "discountAmount": 1000.00,
  "discountRate": 100.0,
  "totalAmount": 0.00,
  "finalAmount": 0.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": false,
  "isParcelaIgual": false,
  "processes": [
    { "id": 1 }
  ]
}
```
**Resultado Esperado**: 201 Created

#### 15. Negociação com Muitas Parcelas
```json
{
  "debtAmount": 1200.00,
  "discountAmount": 200.00,
  "discountRate": 16.67,
  "totalAmount": 1000.00,
  "finalAmount": 1000.00,
  "effectiveDate": "2024-01-15",
  "startDate": "2024-01-15",
  "endDate": "2024-12-31",
  "isInstallmentment": true,
  "isParcelaIgual": true,
  "totalInstallments": 12,
  "processes": [
    { "id": 1 }
  ],
  "installmentments": [
    {
      "installmentNumber": 1,
      "installmentAmount": 83.33,
      "installmentPercentage": 8.333,
      "dueDate": "2024-02-15",
      "penaltyPercentage": 2.0
    },
    {
      "installmentNumber": 2,
      "installmentAmount": 83.33,
      "installmentPercentage": 8.333,
      "dueDate": "2024-03-15",
      "penaltyPercentage": 2.0
    }
    // ... continuar com as outras 10 parcelas
  ]
}
```
**Resultado Esperado**: 201 Created (se a soma estiver correta)
