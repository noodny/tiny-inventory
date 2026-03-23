import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storesReducer from '../store/storesSlice';
import productsReducer from '../store/productsSlice';
import inventoryReducer from '../store/inventorySlice';
import ProductsPage from '../pages/ProductsPage';

vi.mock('@/api/products', () => ({
  fetchProducts: vi.fn().mockResolvedValue({
    data: [
      { id: 1, sku: 'KB-001', name: 'Keyboard', category: 'Peripherals', description: null, price: '49.99', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
      { id: 2, sku: 'HUB-007', name: 'USB Hub', category: 'Peripherals', description: 'A hub', price: '34.99', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    ],
    meta: { page: 1, pageSize: 20, total: 2, totalPages: 1 },
  }),
  createProduct: vi.fn().mockResolvedValue({ id: 1, sku: 'KB-001', name: 'Keyboard', category: 'Peripherals', description: null, price: '49.99', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }),
  updateProduct: vi.fn().mockResolvedValue({ id: 1, sku: 'KB-001', name: 'Keyboard', category: 'Peripherals', description: null, price: '49.99', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }),
  deleteProduct: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/api/stores', () => ({
  fetchStores: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
}));

vi.mock('@/api/inventory', () => ({
  fetchInventory: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
}));

function renderPage() {
  const store = configureStore({
    reducer: { stores: storesReducer, products: productsReducer, inventory: inventoryReducer },
  });
  return render(
    <Provider store={store}>
      <ProductsPage />
    </Provider>,
  );
}

describe('ProductsPage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders product list with SKU and price', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Keyboard')).toBeInTheDocument();
    });
    expect(screen.getByText('KB-001')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('USB Hub')).toBeInTheDocument();
  });

  it('shows category column', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Keyboard')).toBeInTheDocument();
    });
    expect(screen.getAllByText('Peripherals').length).toBeGreaterThanOrEqual(1);
  });

  it('opens create dialog when clicking New Product', async () => {
    const user = userEvent.setup();
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Keyboard')).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: /new product/i }));
    expect(screen.getByRole('heading', { name: /create product/i })).toBeInTheDocument();
  });

  it('shows empty state when no products', async () => {
    const api = await import('@/api/products');
    vi.mocked(api.fetchProducts).mockResolvedValueOnce({
      data: [],
      meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 },
    });

    const store = configureStore({
      reducer: { stores: storesReducer, products: productsReducer, inventory: inventoryReducer },
    });
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>,
    );
    await waitFor(() => {
      expect(screen.getByText(/no products yet/i)).toBeInTheDocument();
    });
  });
});
