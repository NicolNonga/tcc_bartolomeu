# Documentação do Módulo: Documentos de Viaturas & Alertas de Vencimento

## 1. Visão Geral

O módulo de **Documentos de Viaturas e Alertas de Vencimento** é responsável por gerir a documentação legal e operacional da frota automobilística, especificamente:
- **Seguro** (`seguro`): Apólices de seguro obrigatório ou facultativo da viatura.
- **Inspecção Periódica** (`inspeccao`): Inspecção técnica periódica (ex: IMTT / Direcção Nacional de Viação e Trânsito).
- **Licença de Circulação** (`licenca_circulacao`): Licença de circulação e taxa de circulação anual.

Além do registo e histórico documental, o módulo possui um motor autônomo e parametrizável de **Alertas de Vencimento**, incumbido de monitorizar as datas de validade dos documentos, gerar notificações no sistema e expedir e-mails automáticos para a equipa de Gestores de Frota.

---

## 2. Arquitectura e Modelagem de Dados

### 2.1 Modelo `DocumentoViatura`
- **Ficheiro:** `app/models/documento_viatura.ts`
- **Tabela BD:** `documento_viaturas`

| Campo | Tipo | Nulo | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `integer` (PK) | Não | Identificador único do documento |
| `viatura_id` | `integer` (FK) | Não | Referência à viatura (`viaturas.id`) |
| `tipo_documento` | `enum` | Não | Valores: `'seguro'`, `'inspeccao'`, `'licenca_circulacao'` |
| `numero_documento` | `string(100)` | Sim | Número do documento/apólice/licença |
| `entidade_emissora` | `string(200)` | Sim | Nome da companhia de seguros ou órgão emissor |
| `data_emissao` | `date` | Sim | Data em que o documento foi emitido |
| `data_validade` | `date` | Não | Data em que o documento expira |
| `observacao` | `text` | Sim | Notas ou observações adicionais |
| `created_at` | `timestamp` | Não | Data de criação do registo |
| `updated_at` | `timestamp` | Não | Data de última actualização |

---

## 3. Endpoints da API REST

Todas as rotas exigem autenticação via token Bearer (`middleware.auth()`).

### 3.1 Gestão de Documentos (`/api/documentos-viatura`)

#### `GET /api/documentos-viatura/viatura/:viaturaId`
- **Descrição:** Lista todos os documentos associados a uma viatura, ordenados pela data de validade.
- **Parâmetros de Caminho:** `viaturaId` (Integer)
- **Resposta `200 OK`:**
```json
{
  "data": [
    {
      "id": 1,
      "viaturaId": 5,
      "tipoDocumento": "seguro",
      "numeroDocumento": "SEG-2026-9921",
      "entidadeEmissora": "ENSA Seguros",
      "dataEmissao": "2025-08-01",
      "dataValidade": "2026-08-01",
      "observacao": "Apólice contra todos os riscos",
      "createdAt": "2026-07-30T10:00:00.000Z",
      "updatedAt": "2026-07-30T10:00:00.000Z"
    }
  ]
}
```

#### `POST /api/documentos-viatura`
- **Descrição:** Cria um novo documento de viatura.
- **Corpo do Pedido (JSON):**
```json
{
  "viatura_id": 5,
  "tipo_documento": "seguro",
  "numero_documento": "SEG-2026-9921",
  "entidade_emissora": "ENSA Seguros",
  "data_emissao": "2025-08-01",
  "data_validade": "2026-08-01",
  "observacao": "Seguro da frota executiva"
}
```
- **Validações (`criarDocumentoViaturaValidator`):**
  - `viatura_id`: Obrigatório, numérico
  - `tipo_documento`: Obrigatório, deve ser um dos valores: `seguro`, `inspeccao`, `licenca_circulacao`
  - `data_validade`: Obrigatório, formato de data
- **Resposta `201 Created`:**
```json
{
  "message": "Documento registado",
  "data": { ... }
}
```

#### `PUT /api/documentos-viatura/:id`
- **Descrição:** Actualiza as informações de um documento existente.
- **Parâmetros de Caminho:** `id` (Integer)
- **Corpo do Pedido (JSON):**
```json
{
  "numero_documento": "SEG-2026-9921-REV1",
  "data_validade": "2027-08-01"
}
```
- **Resposta `200 OK`:** Retorna o objecto do documento actualizado.

#### `DELETE /api/documentos-viatura/:id`
- **Descrição:** Remove o documento do sistema.
- **Resposta `200 OK`:**
```json
{
  "message": "Documento removido"
}
```

---

### 3.2 Alertas e Notificações de Vencimento (`/api/alertas`)

#### `GET /api/alertas?dias=30`
- **Descrição:** Consulta a lista consolidada de documentos a vencer, cartas de condução a caducar e manutenções agendadas pendentes nos próximos `dias` (padrão: 30 dias).
- **Resposta `200 OK`:**
```json
{
  "data": {
    "documentos": [ ... ],
    "cartas": [ ... ],
    "agendamentos": [ ... ]
  }
}
```

#### `POST /api/alertas/gerar-notificacoes?dias=30`
- **Descrição:** Processa a verificação de vencimento nos próximos `dias`, gerando notificações no sistema e enviando e-mails para os gestores de frota.
- **Resposta `200 OK`:**
```json
{
  "message": "Notificações geradas com sucesso",
  "data": {
    "criadas": 3,
    "documentos": 2,
    "cartas": 1,
    "agendamentos": 0,
    "emails_enviados": 3
  }
}
```

---

## 4. Execução Automática via CLI (Comando Ace)

Para automatizar a monitorização e expedição diária de alertas sem intervenção manual, pode ser executado o comando Ace via Cron Job:

```bash
node ace alertas:verificar-vencimentos --dias=30
```

### Configuração Recomendada no Crontab (Servidor Linux)
Para executar diariamente às 08:00 AM:
```cron
0 8 * * * cd /caminho/para/backend/tcc_app && node ace alertas:verificar-vencimentos --dias=30 >> /var/log/tcc_vencimentos.log 2>&1
```

---

## 5. Regras de Negócio e Prevenção de Duplicados

1. **Janela de Alerta Parametrizável:** Por omissão, o sistema analisa itens que vençam nos próximos 30 dias.
2. **Desduplicação de Notificações:** O serviço `GerarNotificacoesVencimentoService` consulta `notificacaoRepository.existeRecente()` para garantir que notificações idênticas não são geradas repetidamente em curto intervalo.
3. **Disparo de E-mails:** Para cada notificação criada, se o utilizador possuir endereço de e-mail válido, é disparado um e-mail com o título do documento e matrícula da viatura afectada.
