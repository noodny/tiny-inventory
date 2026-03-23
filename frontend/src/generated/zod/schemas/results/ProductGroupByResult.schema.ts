import * as z from 'zod';
export const ProductGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    sku: z.number(),
    name: z.number(),
    category: z.number(),
    description: z.number(),
    price: z.number(),
    isActive: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    inventory: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    price: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    sku: z.string().nullable(),
    name: z.string().nullable(),
    category: z.string().nullable(),
    description: z.string().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    sku: z.string().nullable(),
    name: z.string().nullable(),
    category: z.string().nullable(),
    description: z.string().nullable(),
    price: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));