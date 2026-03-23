import * as z from 'zod';
export const InventoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    storeId: z.number(),
    productId: z.number(),
    quantity: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    store: z.number(),
    product: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    storeId: z.number().nullable(),
    productId: z.number().nullable(),
    quantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    storeId: z.number().nullable(),
    productId: z.number().nullable(),
    quantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    storeId: z.number().int().nullable(),
    productId: z.number().int().nullable(),
    quantity: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    storeId: z.number().int().nullable(),
    productId: z.number().int().nullable(),
    quantity: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});