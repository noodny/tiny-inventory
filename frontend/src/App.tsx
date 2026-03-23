import { useState, useEffect } from 'react';
import AppShell from './components/layout/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import StoresPage from './pages/StoresPage';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage';

function getHash() {
  return window.location.hash.replace('#', '') || 'stores';
}

export default function App() {
  const [page, setPage] = useState(getHash);

  useEffect(() => {
    const handler = () => setPage(getHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <ErrorBoundary>
      <AppShell>
        {page === 'stores' && <StoresPage />}
        {page === 'products' && <ProductsPage />}
        {page === 'inventory' && <InventoryPage />}
        {!['stores', 'products', 'inventory'].includes(page) && <StoresPage />}
      </AppShell>
    </ErrorBoundary>
  );
}
