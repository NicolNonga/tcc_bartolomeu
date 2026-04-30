# Testes de Integração - API de Negociação

## Como Usar os Testes no Postman

### 1. Importar a Coleção
1. Abra o Postman
2. Clique em "Import"
3. Selecione o arquivo `negociacao-api-tests.json`
4. Importe também o arquivo `environment.json`

### 2. Configurar o Ambiente
1. Selecione o ambiente "Negociação API - Environment"
2. Configure as variáveis:
   - `base_url`: URL da sua API (padrão: http://localhost:3333)
   - `auth_token`: Token de autenticação se necessário
   - `process_id_valid`: ID de um processo válido no seu banco (padrão: 1)
   - `process_id_invalid`: ID de um processo inválido (padrão: 99999)

### 3. Executar os Testes

#### Casos de Sucesso (Devem retornar 201 Created)
- **01 - Negociação Simples**: Teste básico sem parcelas
- **02 - Negociação Parcelada (Parcelas Iguais)**: 3 parcelas iguais
- **03 - Negociação Parcelada (Parcelas Diferentes)**: 3 parcelas com valores diferentes
- **04 - Negociação com Desconto Total**: Desconto de 100%

#### Casos de Erro - Validação de Datas (Devem retornar 400 Bad Request)
- **05 - Data Início Posterior à Data Fim**
- **06 - Data Efetiva Futura**

#### Casos de Erro - Validação de Valores (Devem retornar 400 Bad Request)
- **07 - Valor Total Incorreto**
- **08 - Valor Final Maior que Total**
- **09 - Valores Negativos**

#### Casos de Erro - Validação de Processos (Devem retornar 400 Bad Request)
- **10 - Sem Processos**
- **11 - Processo Inexistente**

#### Casos de Erro - Validação de Parcelas (Devem retornar 400 Bad Request)
- **12 - Parcelada Sem Parcelas**
- **13 - Soma das Parcelas Incorreta**
- **14 - Parcelas Diferentes Marcadas como Iguais**
- **15 - Data Vencimento Parcela Anterior ao Início**

#### Casos de Erro - Campos Obrigatórios (Devem retornar 400 Bad Request)
- **16 - Campos Obrigatórios Ausentes**
- **17 - JSON Malformado**

#### Casos Limite (Devem retornar 201 Created)
- **18 - Valor Mínimo (1 centavo)**
- **19 - Muitas Parcelas (12x)**

### 4. Executar Todos os Testes
1. Clique com o botão direito na coleção
2. Selecione "Run collection"
3. Configure as opções de execução
4. Clique em "Run Negociação API Tests"

### 5. Verificar Resultados

#### Respostas de Sucesso (201 Created)
```json
{
  "message": "Negociação criada com sucesso",
  "data": {
    "id": 123,
    "taxaDesconto": 10.0,
    "valorTotal": 900.00,
    "valorFinal": 900.00,
    "dataEfetiva": "2024-01-15T00:00:00.000Z",
    "dataInicio": "2024-01-15T00:00:00.000Z",
    "dataFim": "2024-12-31T00:00:00.000Z",
    "eParcelado": false,
    "isParcelaIgual": false,
    "status": "ATIVA",
    "criadoEm": "2024-01-15T10:30:00.000Z",
    "atualizadoEm": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Respostas de Erro (400 Bad Request)
```json
{
  "message": "Erro de validação",
  "error": "A data de início deve ser anterior à data fim",
  "type": "validation_error"
}
```

### 6. Pré-requisitos para os Testes

#### Banco de Dados
Certifique-se de que existe pelo menos um processo válido na tabela `processes`:
```sql
INSERT INTO processes (id, name, status) VALUES (1, 'Processo Teste', 'ATIVO');
```

#### Servidor
- API rodando em http://localhost:3333 (ou configure a variável `base_url`)
- Banco de dados configurado e migrado
- Todas as dependências instaladas

### 7. Troubleshooting

#### Erro 404 - Not Found
- Verifique se a API está rodando
- Confirme se a rota `/api/negotiations` está configurada

#### Erro 500 - Internal Server Error
- Verifique os logs do servidor
- Confirme se o banco de dados está acessível
- Verifique se as migrações foram executadas

#### Erro de Validação Inesperado
- Verifique se o processo com ID 1 existe no banco
- Confirme se os campos obrigatórios estão presentes
- Verifique se os tipos de dados estão corretos

### 8. Personalização dos Testes

Para adaptar os testes ao seu ambiente:

1. **Alterar IDs de Processos**: Modifique `process_id_valid` no environment
2. **Alterar Datas**: Ajuste as datas nos JSONs conforme necessário
3. **Adicionar Autenticação**: Configure `auth_token` e adicione headers de auth
4. **Alterar URL Base**: Configure `base_url` para seu ambiente

### 9. Automação

Para executar os testes via linha de comando:
```bash
newman run negociacao-api-tests.json -e environment.json --reporters cli,json
```

### 10. Métricas de Sucesso

- **Casos de Sucesso**: 4 testes devem retornar 201
- **Casos de Erro**: 15 testes devem retornar 400
- **Taxa de Sucesso Esperada**: 100% dos testes passando com os códigos corretos
