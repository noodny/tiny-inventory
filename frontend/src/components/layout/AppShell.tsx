import { type ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Stores', href: '#stores' },
  { label: 'Products', href: '#products' },
  { label: 'Inventory', href: '#inventory' },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const [hash, setHash] = useState(window.location.hash || '#stores');

  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#stores');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
          <h1 className="text-lg font-semibold">Tiny Inventory</h1>
          <nav className="flex gap-4" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  hash === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
