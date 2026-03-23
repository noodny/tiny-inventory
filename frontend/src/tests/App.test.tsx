import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

function renderApp() {
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

describe('App', () => {
  it('renders the heading', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /tiny inventory/i })).toBeInTheDocument();
  });
});
