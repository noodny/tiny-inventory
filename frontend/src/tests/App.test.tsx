import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import itemsReducer from '../store/itemsSlice';

// Mock the API layer so no real HTTP calls are made
vi.mock('../api/items', () => ({
  fetchItemsApi: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Wireless Keyboard',
      description: 'A keyboard',
      quantity: 50,
      price: '49.99',
      sku: 'KB-001',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  ]),
  createItemApi: vi.fn(),
  updateItemApi: vi.fn(),
  deleteItemApi: vi.fn().mockResolvedValue(undefined),
  createItemSchema: {
    parse: vi.fn(),
    safeParse: vi.fn(),
  },
}));

function renderWithStore() {
  const store = configureStore({ reducer: { items: itemsReducer } });
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the heading', async () => {
    await act(async () => {
      renderWithStore();
    });
    expect(screen.getByRole('heading', { name: /tiny inventory/i })).toBeInTheDocument();
  });

  it('shows items fetched from the API', async () => {
    renderWithStore();
    await waitFor(() => {
      expect(screen.getByText('Wireless Keyboard')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    // Synchronously render to capture the loading state before async effects run
    let container!: ReturnType<typeof renderWithStore>;
    act(() => {
      container = renderWithStore();
    });
    expect(container.container).toBeTruthy();
    // Loading text appears while fetch is in progress
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
