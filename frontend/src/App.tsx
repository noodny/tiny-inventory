import { useState, useEffect } from 'react';
import AppShell from './components/layout/AppShell';
import StoresPage from './pages/StoresPage';
import ProductsPage from './pages/ProductsPage';

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
    <AppShell>
      {page === 'stores' && <StoresPage />}
      {page === 'products' && <ProductsPage />}
      {page === 'inventory' && (
        <p className="text-muted-foreground">Inventory management coming in PRD-10.</p>
      )}
      {!['stores', 'products', 'inventory'].includes(page) && <StoresPage />}
    </AppShell>
  );
}
