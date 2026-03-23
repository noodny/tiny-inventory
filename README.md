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

**Backend** (`POST /api/inventory/batch`) - Resolves store names and SKUs via two batch queries, then validates every row (unknown store/product, inactive records, duplicate pairs). If any row fails validation the entire import is rejected. On success, all rows are upserted inside a single Prisma transaction and the response reports created/updated counts per row.

## Decisions & Trade-offs

- **Shared contract package** (`shared/`) - Zod schemas are the single source of truth; they generate TypeScript types for the frontend and JSON Schemas for Fastify validation.
- **Hash-based routing** - Three pages, no external router. Keeps the bundle small and avoids server-side route config.
- **Redux Toolkit** - Predictable state with good devtools; async thunks keep data-fetching in slices.
- **Fastify over Express** - Built-in JSON Schema validation, serialization, and better throughput.
- **Mocked Prisma in unit tests** - Fast and deterministic, but no real DB coverage; integration tests would complement this.
- **All-or-nothing batch import** - If any row fails validation the whole import is rejected. Simpler to reason about than partial success, and the preview step gives users a chance to fix errors first.

## Testing Approach

- **Backend unit tests** (Vitest) - Each route module has tests with a mocked Prisma client. Covers happy paths, not-found / conflict / validation errors, pagination metadata, and response field completeness.
- **E2E tests** (Playwright) - Full CRUD flows for stores, products, and inventory; navigation between pages. Playwright auto-starts the dev servers.
- **Frontend unit tests** - Testing Library + Vitest are wired up but no component tests have been written yet.

## If I Had More Time

- **Frontend component tests** - Cover Redux slices, form validation edge cases, and error states with Testing Library.
- **Integration tests with a real database** - Use Testcontainers (or a Docker-based MySQL) to catch migration and query issues that mocked tests miss.
- **Authentication & RBAC** - There is currently no auth; adding JWT or session-based login with role-based access would be the natural next step for a production deployment.
