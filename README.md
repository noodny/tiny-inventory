# Tiny Inventory

Full-stack inventory management app — TypeScript monorepo.

## Stack

| Layer    | Technology                               |
| -------- | ---------------------------------------- |
| Backend  | Fastify 5, TypeScript, Prisma 6, MySQL 8 |
| Frontend | React 19, Redux Toolkit 2, Zod 3, Vite 6 |
| Tests    | Vitest 3 (unit), Playwright 1 (e2e)      |
| Linting  | ESLint 9 (flat config), Prettier 3       |
| DB       | Prisma migrations + seeding              |
| Infra    | Docker Compose                           |

## Project structure

```
tiny-inventory/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma schema (MySQL)
│   │   └── seed.ts             # Database seed data
│   ├── src/
│   │   ├── app.ts              # Fastify app factory
│   │   ├── index.ts            # Entry point
│   │   ├── plugins/prisma.ts   # Prisma plugin
│   │   ├── routes/             # API route modules
│   │   └── tests/              # Vitest unit tests
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/                # API clients
│   │   ├── components/         # React components
│   │   ├── store/              # Redux Toolkit slices + hooks
│   │   └── tests/              # Vitest unit tests
│   ├── tests/                  # Playwright e2e tests
│   └── Dockerfile
├── docker-compose.yml
└── eslint.config.js            # Root ESLint flat config
```

## Getting started

### Prerequisites

- Node.js 22+
- Docker & Docker Compose (for MySQL)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure local environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env to set DATABASE_URL if needed
```

### 3. Start MySQL

```bash
docker compose up mysql -d
```

### 4. Run database migrations & seed

```bash
npm run db:migrate    # create/apply migrations
npm run db:seed       # insert sample data
```

### 5. Start development servers

```bash
npm run dev           # starts both backend (port 3000) and frontend (port 5173)
```

The Vite dev server proxies `/api/*` requests to the backend automatically.

---

## Docker Compose (full stack)

```bash
docker compose up
```

This starts MySQL, the backend (tsx watch), and the frontend (Vite dev server) with hot reload via volume mounts.

---

## Available scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Start backend + frontend in watch mode |
| `npm run build`      | Build both packages                    |
| `npm run test`       | Run all Vitest unit tests              |
| `npm run test:e2e`   | Run Playwright e2e tests               |
| `npm run lint`       | ESLint across all packages             |
| `npm run lint:fix`   | ESLint auto-fix                        |
| `npm run format`     | Prettier format                        |
| `npm run db:migrate` | Prisma migrate dev                     |
| `npm run db:seed`    | Seed the database                      |
| `npm run db:studio`  | Open Prisma Studio                     |

---

## Domain Model

The system manages **Stores**, **Products**, and **Inventory** (product-in-store stock):

- **Store** — physical location where products are stocked
- **Product** — global catalog record with unique SKU
- **Inventory** — links a Store and Product with a stock quantity

API endpoints for Store, Product, and Inventory CRUD are being implemented.

---

## Production

In production mode (`NODE_ENV=production`) the backend also serves the built frontend from `../frontend/dist`, so a single process handles everything. Use the multi-stage Dockerfiles:

```bash
docker compose -f docker-compose.yml up --build
```
