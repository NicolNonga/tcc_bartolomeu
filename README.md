# TCC App Backend API

Backend service built with AdonisJS 6, Docker, MySQL and Redis.

This project provides the REST API layer for the TCC platform, including:

- Authentication & Authorization
- User Management
- Roles & Permissions
- Database Migrations & Seeders
- Swagger/OpenAPI Documentation

---

## 🚀 Tech Stack

- Node.js 22
- AdonisJS 6
- MySQL 8
- Redis 7
- Docker / Docker Compose
- Lucid ORM
- JWT Authentication
- Swagger Docs

---

## 📁 Project Structure

```bash
tcc_app/
├── app/                  # Controllers, Models, Services
├── config/               # Adonis configuration files
├── database/
│   ├── migrations/       # Database schema migrations
│   └── seeders/          # Initial database seeders
├── scripts/
│   └── entrypoint.sh     # Container bootstrap script
├── start/                # Routes and kernel
├── Dockerfile
├── ace.js
└── package.json
```

---

## 🐳 Running with Docker

### Build containers

```bash
docker compose build --no-cache
```

### Start application

```bash
docker compose up
```

Application will be available at:

```bash
http://localhost:3333
```

---

## ⚙️ Automatic Container Bootstrap

When the `app` container starts, the following steps are executed automatically:

1. Wait for MySQL to become available
2. Run database migrations
3. Run database seeders
4. Start AdonisJS development server

This behavior is controlled by:

```bash
scripts/entrypoint.sh
```

---

## 🛢️ Database Configuration

The project uses MySQL 8 running in Docker.

Default credentials:

| Variable | Value |
|----------|-------|
| DB_HOST | mysql |
| DB_PORT | 3306 |
| DB_USER | adonis |
| DB_PASSWORD | secret |
| DB_DATABASE | adonis_db |

---

## 🔄 Manual Database Commands

### Run migrations manually

```bash
docker compose exec app node ace migration:run
```

### Run seeders manually

```bash
docker compose exec app node ace db:seed
```

### Reset database

```bash
docker compose down -v
docker compose up --build
```

---

## 👤 Default Seeded User

After running seeders, the following admin user is available:

```bash
email: admin@tcc.com
password: 12345678
```

> Change this user after first login.

---

## 📚 API Documentation (Swagger)

Swagger JSON:

```bash
http://localhost:3333/swagger
```

Swagger UI:

```bash
http://localhost:3333/docs
```

---

## 🔐 Authentication

Authentication is based on JWT Bearer Token.

Login endpoint:

```bash
POST /api/auth
```

Use returned token on protected routes:

```bash
Authorization: Bearer <token>
```

---

## 🧪 Useful Docker Commands

### Enter app container

```bash
docker compose exec app sh
```

### Enter mysql container

```bash
docker compose exec mysql mysql -uroot -proot
```

### View logs

```bash
docker logs backend-app-1
```

---

## 🛠️ Common Troubleshooting

### MySQL Access Denied

Reset database volume:

```bash
docker compose down -v
docker compose up --build
```

---

### Container cannot resolve mysql host

Ensure all services are running:

```bash
docker ps
```

Expected:

- backend-app-1
- backend-mysql-1
- backend-redis-1

---

### Run fresh npm install

```bash
docker compose build --no-cache
```

---

## 👥 Development Workflow

1. Create feature branch
2. Implement code
3. Create migration if needed
4. Create/update seeder if needed
5. Test inside Docker
6. Open Pull Request

---

## 📌 Important Notes

- Never run Node locally outside Docker for this project
- All commands should be executed through Docker Compose
- Database state is managed by Docker volumes
- Seeders should be idempotent

---

## 📄 License

Internal Academic Project - TCC Platform
