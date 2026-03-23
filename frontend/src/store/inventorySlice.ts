import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  InventoryWithRelations,
  PaginationMeta,
  CreateInventory,
  UpdateInventory,
} from 'tiny-inventory-shared';
import * as api from '@/api/inventory';

interface InventoryState {
  items: InventoryWithRelations[];
  meta: PaginationMeta | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  meta: null,
  status: 'idle',
  error: null,
};

export const fetchInventory = createAsyncThunk(
  'inventory/fetchAll',
  async (query: Record<string, string | number | boolean> = {}) => {
    return api.fetchInventory(query);
  },
);

export const fetchStoreInventory = createAsyncThunk(
  'inventory/fetchByStore',
  async ({ storeId, query }: { storeId: number; query?: Record<string, string | number | boolean> }) => {
    return api.fetchStoreInventory(storeId, query);
  },
);

export const addInventory = createAsyncThunk('inventory/add', async (input: CreateInventory) => {
  return api.createInventory(input);
});

export const editInventory = createAsyncThunk(
  'inventory/edit',
  async ({ id, input }: { id: number; input: UpdateInventory }) => {
    return api.updateInventory(id, input);
  },
);

export const removeInventory = createAsyncThunk('inventory/remove', async (id: number) => {
  await api.deleteInventory(id);
  return id;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch inventory';
      })
      .addCase(fetchStoreInventory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStoreInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchStoreInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch inventory';
      })
      .addCase(removeInventory.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;
