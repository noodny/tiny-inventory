import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Store, PaginationMeta, CreateStore, UpdateStore } from 'tiny-inventory-shared';
import { ApiError } from '@/api/client';
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

export const addStore = createAsyncThunk('stores/add', async (input: CreateStore, { rejectWithValue }) => {
  try {
    return await api.createStore(input);
  } catch (err) {
    if (err instanceof ApiError) return rejectWithValue(err);
    throw err;
  }
});

export const editStore = createAsyncThunk(
  'stores/edit',
  async ({ id, input }: { id: number; input: UpdateStore }, { rejectWithValue }) => {
    try {
      return await api.updateStore(id, input);
    } catch (err) {
      if (err instanceof ApiError) return rejectWithValue(err);
      throw err;
    }
  },
);

export const removeStore = createAsyncThunk('stores/remove', async (id: number, { rejectWithValue }) => {
  try {
    await api.deleteStore(id);
    return id;
  } catch (err) {
    if (err instanceof ApiError) return rejectWithValue(err);
    throw err;
  }
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
