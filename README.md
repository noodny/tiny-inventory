# Tiny Inventory

Full-stack inventory management app - TypeScript monorepo (Fastify, React, MySQL).

Manage **stores**, **products**, and per-store **inventory** (stock quantities). Supports bulk CSV import for inventory updates.

## Run

```bash
cp backend/.env.example backend/.env
npm run db:generate         # for Prisma generated types to work locally
docker compose up           # app → http://localhost:4200
```

### Debugging

A VSCode `launch.json` debug configuration, attaching to the backend container, is included.

## API Sketch

All routes under `/api`. Paginated via `?page=&pageSize=`. Errors: `{ code, message, details? }`.

| Method | Path | Notes |
|--------|------|-------|
| `GET/POST` | `/api/stores` | list (filterable) / create |
| `GET/PATCH/DELETE` | `/api/stores/:id` | read / update / delete (409 if has inventory) |
| `GET/POST` | `/api/products` | list (filter by category, price, active) / create |
| `GET/PATCH/DELETE` | `/api/products/:id` | read / update / delete (409 if has inventory) |
| `GET/POST` | `/api/inventory` | list (filter by store, category, stock level) / create |
| `PATCH/DELETE` | `/api/inventory/:id` | update quantity / delete |
| `POST` | `/api/inventory/batch` | bulk upsert from CSV (see below) |

## Non-trivial Feature: Batch CSV Import

The inventory page lets users upload a CSV (`store_name,sku,quantity`) to bulk-create or update stock records.

**Frontend** - PapaParse parses the file client-side; each row is validated against a shared Zod schema. A preview table shows valid/error badges before the user confirms.

**Backend** (`POST /api/inventory/batch`) - Checks for duplicate store+SKU pairs upfront, then splits the items into batches of 100. Each batch runs in its own transaction: resolves store names and SKUs, validates every row (unknown store/product, inactive records), queries existing inventory to determine create vs update, then bulk-upserts via a single `INSERT ... ON DUPLICATE KEY UPDATE`. If any row fails validation the entire import is rejected. The chunked approach limits lock duration and avoids holding a single long transaction for large imports.

For testing use sample CSV files from the `/samples` directory.

## Decisions & Trade-offs

- **MySQL** - My DB of choice, I have the most experience with it so it's the first one I went for.
- **Prisma** - Haven't had a chance to use it before. Intuitive schema first approach, built in types and migrations mechanism.
- **Fastify over Express** - Built-in JSON Schema validation, serialization, and better throughput.
- **Shared contract package** (`shared/`) - Zod schemas are the single source of truth; they generate TypeScript types for the frontend and JSON Schemas for Fastify validation.
- **Hash-based routing** - Three pages, no external router. Keeps the bundle small and avoids server-side route config.
- **Redux Toolkit** - Predictable state with good devtools; async thunks keep data-fetching in slices.
- **shadcn/ui + Base UI** - shadcn provides copy-paste component scaffolding styled with Tailwind; Base UI supplies the underlying headless primitives (Select, Dialog, Popover) with built-in accessibility.
- **Mocked Prisma in unit tests** - Fast and deterministic, but no real DB coverage; integration tests would complement this.

## Testing Approach

- **Backend unit tests** (Vitest) - Each route module has tests with a mocked Prisma client. Covers happy paths, not-found / conflict / validation errors, pagination metadata, and response field completeness.
- **E2E tests** (Playwright) - Full CRUD flows for stores, products, and inventory; navigation between pages. Playwright auto-starts the dev servers.
- **Frontend unit tests** - Testing Library + Vitest are wired up but no component tests have been written yet.

## If I Had More Time

- **Frontend router** - Tanstack Router or React Router
- **Fetching library** - Most likely Tanstack Query
- **Frontend component tests** - Cover Redux slices, form validation edge cases, and error states.
- **Integration tests with a real database** - Use Testcontainers (or a Docker-based MySQL) to catch migration and query issues that mocked tests miss.
- **Authentication & RBAC** - There is currently no auth; adding JWT or session-based login with role-based access would be the natural next step for a production deployment.
- **Security review** - Even though the app would be used by employees only it would still make sense to run a security review and safeguard against potential XSS / SQL injection attacks.
