import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

// Mock the API modules so no real HTTP calls are made
vi.mock('@/api/stores', () => ({
  fetchStores: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
  createStore: vi.fn(),
  updateStore: vi.fn(),
  deleteStore: vi.fn(),
}));

vi.mock('@/api/products', () => ({
  fetchProducts: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

vi.mock('@/api/inventory', () => ({
  fetchInventory: vi.fn().mockResolvedValue({ data: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
  fetchStoreInventory: vi.fn(),
  createInventory: vi.fn(),
  updateInventory: vi.fn(),
  deleteInventory: vi.fn(),
}));

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  it('renders the heading and navigation', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /tiny inventory/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main/i })).toBeInTheDocument();
  });

  it('shows stores page by default', async () => {
    renderApp();
    expect(screen.getByRole('heading', { name: 'Stores' })).toBeInTheDocument();
  });
});
