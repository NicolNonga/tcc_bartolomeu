# TCC App Backend API

Serviço backend desenvolvido com AdonisJS 6, Docker, MySQL e Redis.

Este projeto fornece a camada de API REST para a plataforma TCC, incluindo:

- Autenticação e Autorização
- Gestão de Utilizadores
- Gestão de Perfis e Permissões
- Migrations e Seeders da Base de Dados
- Documentação Swagger/OpenAPI

---

## 🚀 Stack Tecnológica

- Node.js 22
- AdonisJS 6
- MySQL 8
- Redis 7
- Docker / Docker Compose
- Lucid ORM
- JWT Authentication
- Swagger Docs

---

## 📁 Estrutura do Projeto

```bash
tcc_app/
├── app/                  # Controllers, Models, Services
├── config/               # Ficheiros de configuração do AdonisJS
├── database/
│   ├── migrations/       # Migrations da base de dados
│   └── seeders/          # Seeders iniciais
├── scripts/
│   └── entrypoint.sh     # Script de bootstrap automático do container
├── start/                # Rotas e kernel HTTP
├── Dockerfile
├── ace.js
└── package.json
```

---

## 🐳 Executando com Docker

### Construir os containers

```bash
docker compose build --no-cache
```

### Iniciar a aplicação

```bash
docker compose up
```

A aplicação ficará disponível em:

```bash
http://localhost:3333
```

---

## ⚙️ Bootstrap Automático do Container

Quando o container `app` é iniciado, os seguintes passos são executados automaticamente:

1. Aguarda o MySQL ficar disponível
2. Executa as migrations da base de dados
3. Executa os seeders iniciais
4. Inicia o servidor de desenvolvimento AdonisJS

Este comportamento é controlado pelo ficheiro:

```bash
scripts/entrypoint.sh
```

---

## 🛢️ Configuração da Base de Dados

O projeto utiliza MySQL 8 rodando em container Docker.

Credenciais padrão:

| Variável | Valor |
|----------|-------|
| DB_HOST | mysql |
| DB_PORT | 3306 |
| DB_USER | adonis |
| DB_PASSWORD | secret |
| DB_DATABASE | adonis_db |

---

## 🔄 Comandos Manuais da Base de Dados

### Executar migrations manualmente

```bash
docker compose exec app node ace migration:run
```

### Executar seeders manualmente

```bash
docker compose exec app node ace db:seed
```

### Resetar completamente a base de dados

```bash
docker compose down -v
docker compose up --build
```

---

## 👤 Utilizador Padrão Gerado pelo Seeder

Após a execução dos seeders, o seguinte utilizador administrador estará disponível:

```bash
email: admin@tcc.com
password: 12345678
```

> Recomenda-se alterar estas credenciais após o primeiro acesso.

---

## 📚 Documentação da API (Swagger)

Swagger JSON:

```bash
http://localhost:3333/swagger
```

Swagger UI:

```bash
http://localhost:3333/docs
```

---

## 🔐 Autenticação

A autenticação da API é baseada em JWT Bearer Token.

Endpoint de login:

```bash
POST /api/auth
```

Após autenticação, utilizar o token retornado nas rotas protegidas:

```bash
Authorization: Bearer <token>
```

---

## 🧪 Comandos Úteis Docker

### Entrar no container da aplicação

```bash
docker compose exec app sh
```

### Entrar no container MySQL

```bash
docker compose exec mysql mysql -uroot -proot
```

### Visualizar logs da aplicação

```bash
docker logs backend-app-1
```

---

## 🛠️ Resolução de Problemas Comuns

### Erro MySQL Access Denied

Resetar completamente o volume da base de dados:

```bash
docker compose down -v
docker compose up --build
```

---

### Container não consegue resolver o host mysql

Verificar se todos os serviços estão ativos:

```bash
docker ps
```

Containers esperados:

- backend-app-1
- backend-mysql-1
- backend-redis-1

---

### Reinstalar dependências Node

```bash
docker compose build --no-cache
```

---

## 👥 Fluxo de Desenvolvimento

1. Criar branch de funcionalidade
2. Implementar código
3. Criar migration se necessário
4. Criar ou atualizar seeder se necessário
5. Testar dentro do ambiente Docker
6. Abrir Pull Request

---

## 📌 Notas Importantes

- Nunca executar Node localmente fora do Docker neste projeto
- Todos os comandos devem ser executados através do Docker Compose
- O estado da base de dados é gerido por volumes Docker
- Seeders devem ser idempotentes

---

## 📄 Licença

Projeto Académico Interno - Plataforma TCC
