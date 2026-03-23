import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';

function renderWithStore() {
  const store = configureStore({ reducer: {} });
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  it('renders the heading', () => {
    renderWithStore();
    expect(screen.getByRole('heading', { name: /tiny inventory/i })).toBeInTheDocument();
  });
});
