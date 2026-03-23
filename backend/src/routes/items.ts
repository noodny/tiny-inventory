import { FastifyInstance } from 'fastify';

// Legacy item routes – removed as part of PRD-01 domain migration.
// Store, Product, and Inventory routes will be added in PRD-04/05/06.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function itemsRoutes(fastify: FastifyInstance) {
  // no-op: legacy item endpoints removed
}
