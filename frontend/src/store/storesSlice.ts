import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Store, PaginationMeta, CreateStore, UpdateStore } from 'tiny-inventory-shared';
import * as api from '@/api/stores';

interface StoresState {
  items: Store[];
  meta: PaginationMeta | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StoresState = {
  items: [],
  meta: null,
  status: 'idle',
  error: null,
};

export const fetchStores = createAsyncThunk(
  'stores/fetchAll',
  async (query: Record<string, string | number | boolean> = {}) => {
    return api.fetchStores(query);
  },
);

export const addStore = createAsyncThunk('stores/add', async (input: CreateStore) => {
  return api.createStore(input);
});

export const editStore = createAsyncThunk(
  'stores/edit',
  async ({ id, input }: { id: number; input: UpdateStore }) => {
    return api.updateStore(id, input);
  },
);

export const removeStore = createAsyncThunk('stores/remove', async (id: number) => {
  await api.deleteStore(id);
  return id;
});

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch stores';
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editStore.fulfilled, (state, action) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeStore.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      });
  },
});

export default storesSlice.reducer;
