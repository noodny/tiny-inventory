import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storesReducer from '../store/storesSlice';
import productsReducer from '../store/productsSlice';
import inventoryReducer from '../store/inventorySlice';
import StoresPage from '../pages/StoresPage';

vi.mock('@/api/stores', () => ({
  fetchStores: vi.fn().mockResolvedValue({
    data: [
      { id: 1, name: 'Downtown Store', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
      { id: 2, name: 'Airport Kiosk', isActive: false, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    ],
    meta: { page: 1, pageSize: 20, total: 2, totalPages: 1 },
  }),
  createStore: vi.fn().mockResolvedValue({ id: 1, name: 'Downtown Store', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }),
  updateStore: vi.fn().mockResolvedValue({ id: 1, name: 'Updated Store', isActive: true, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' }),
  deleteStore: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/api/products', () => ({
  fetchProducts: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
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
      <StoresPage />
    </Provider>,
  );
}

describe('StoresPage', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders store list after loading', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Downtown Store')).toBeInTheDocument();
    });
    expect(screen.getByText('Airport Kiosk')).toBeInTheDocument();
  });

  it('shows active/inactive badges', async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Downtown Store')).toBeInTheDocument();
    });
    const badges = screen.getAllByText(/Active|Inactive/);
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it('opens create dialog when clicking New Store', async () => {
    const user = userEvent.setup();
    renderPage();
    await waitFor(() => {
      expect(screen.getByText('Downtown Store')).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: /new store/i }));
    expect(screen.getByRole('heading', { name: /create store/i })).toBeInTheDocument();
  });

  it('shows page heading', async () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Stores' })).toBeInTheDocument();
  });
});
