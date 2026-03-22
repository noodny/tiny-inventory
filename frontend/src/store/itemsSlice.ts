import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { z } from 'zod';
import { fetchItemsApi, createItemApi, updateItemApi, deleteItemApi } from '@/api/items';
import type { CreateItemInput, UpdateItemInput } from '@/api/items';

// ── Zod schema (single source of truth for the Item shape) ────────────────────
export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  quantity: z.number(),
  price: z.string(),
  sku: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Item = z.infer<typeof itemSchema>;

// ── State ─────────────────────────────────────────────────────────────────────
interface ItemsState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  status: 'idle',
  error: null,
};

// ── Async thunks ──────────────────────────────────────────────────────────────
export const fetchItems = createAsyncThunk('items/fetchAll', async () => {
  const data = await fetchItemsApi();
  return z.array(itemSchema).parse(data);
});

export const addItem = createAsyncThunk('items/add', async (input: CreateItemInput) => {
  const data = await createItemApi(input);
  return itemSchema.parse(data);
});

export const patchItem = createAsyncThunk(
  'items/patch',
  async ({ id, input }: { id: number; input: UpdateItemInput }) => {
    const data = await updateItemApi(id, input);
    return itemSchema.parse(data);
  },
);

export const removeItem = createAsyncThunk('items/remove', async (id: number) => {
  await deleteItemApi(id);
  return id;
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchItems
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch items';
      })
      // addItem
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // patchItem
      .addCase(patchItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // removeItem
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
