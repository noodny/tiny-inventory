import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, PaginationMeta, CreateProduct, UpdateProduct } from 'tiny-inventory-shared';
import { ApiError } from '@/api/client';
import * as api from '@/api/products';

interface ProductsState {
  items: Product[];
  meta: PaginationMeta | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  meta: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (query: Record<string, string | number | boolean> = {}) => {
    return api.fetchProducts(query);
  },
);

export const addProduct = createAsyncThunk('products/add', async (input: CreateProduct, { rejectWithValue }) => {
  try {
    return await api.createProduct(input);
  } catch (err) {
    if (err instanceof ApiError) return rejectWithValue(err);
    throw err;
  }
});

export const editProduct = createAsyncThunk(
  'products/edit',
  async ({ id, input }: { id: number; input: UpdateProduct }, { rejectWithValue }) => {
    try {
      return await api.updateProduct(id, input);
    } catch (err) {
      if (err instanceof ApiError) return rejectWithValue(err);
      throw err;
    }
  },
);

export const removeProduct = createAsyncThunk('products/remove', async (id: number, { rejectWithValue }) => {
  try {
    await api.deleteProduct(id);
    return id;
  } catch (err) {
    if (err instanceof ApiError) return rejectWithValue(err);
    throw err;
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
