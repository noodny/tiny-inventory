import { useEffect, useState, useCallback } from 'react';
import type { Store, Product } from 'tiny-inventory-shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchInventory, fetchStoreInventory } from '@/store/inventorySlice';
import * as inventoryApi from '@/api/inventory';
import { ApiError } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import InventoryFiltersBar, { emptyFilters, type InventoryFilters } from '@/components/inventory/InventoryFilters';
import AssignInventoryDialog from '@/components/inventory/AssignInventoryDialog';
import QuantityEditCell from '@/components/inventory/QuantityEditCell';
import * as storesApi from '@/api/stores';
import * as productsApi from '@/api/products';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const { items, meta, status, error } = useAppSelector((s) => s.inventory);

  const [page, setPage] = useState(1);
  const [storeId, setStoreId] = useState<string>('all');
  const [filters, setFilters] = useState<InventoryFilters>(emptyFilters);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionError, setActionError] = useState('');

  // For the assign dialog dropdowns
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    storesApi.fetchStores({ pageSize: 100 }).then((r) => setStores(r.data));
    productsApi.fetchProducts({ pageSize: 100 }).then((r) => setProducts(r.data));
  }, []);

  const buildQuery = useCallback(() => {
    const q: Record<string, string | number | boolean> = { page, pageSize: 20 };
    if (filters.category) q.category = filters.category;
    if (filters.minPrice) q.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) q.maxPrice = Number(filters.maxPrice);
    if (filters.stockLevel && filters.stockLevel !== 'all') q.stockLevel = filters.stockLevel;
    return q;
  }, [page, filters]);

  const load = useCallback(() => {
    const q = buildQuery();
    if (storeId !== 'all') {
      dispatch(fetchStoreInventory({ storeId: Number(storeId), query: q }));
    } else {
      dispatch(fetchInventory(q));
    }
  }, [dispatch, storeId, buildQuery]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAssign = async (data: { storeId: number; productId: number; quantity: number }) => {
    await inventoryApi.createInventory(data);
    load();
  };

  const handleQuantityUpdate = async (id: number, quantity: number) => {
    await inventoryApi.updateInventory(id, { quantity });
    load();
  };

  const handleDelete = async (id: number) => {
    setActionError('');
    try {
      await inventoryApi.deleteInventory(id);
      load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.body.message : 'Failed to remove assignment');
    }
  };

  const handleFilterChange = (f: InventoryFilters) => {
    setFilters(f);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(emptyFilters);
    setPage(1);
  };

  const stockBadge = (qty: number) => {
    if (qty === 0) return <Badge variant="destructive">Out of stock</Badge>;
    if (qty <= 10) return <Badge variant="secondary">Low stock</Badge>;
    return <Badge variant="default">{qty}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Inventory</h2>
        <Button onClick={() => setDialogOpen(true)}>Assign Product</Button>
      </div>

      <div className="flex items-end gap-4">
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Store</span>
          <Select value={storeId} onValueChange={(v) => { setStoreId(v ?? 'all'); setPage(1); }}>
            <SelectTrigger className="h-9 w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stores</SelectItem>
              {stores.map((s) => (
                <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <InventoryFiltersBar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
      </div>

      {error && (
        <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
      )}
      {actionError && (
        <Alert variant="destructive"><AlertDescription>{actionError}</AlertDescription></Alert>
      )}

      {status === 'loading' && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {status === 'succeeded' && items.length === 0 && (
        <EmptyState
          title="No inventory records"
          description="Assign products to stores to start tracking inventory."
          action={<Button onClick={() => setDialogOpen(true)}>Assign Product</Button>}
        />
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.store.name}</TableCell>
                  <TableCell>{inv.product.name}</TableCell>
                  <TableCell className="font-mono text-sm">{inv.product.sku}</TableCell>
                  <TableCell>{inv.product.category}</TableCell>
                  <TableCell className="text-right">
                    ${parseFloat(inv.product.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <QuantityEditCell
                      value={inv.quantity}
                      onSave={(qty) => handleQuantityUpdate(inv.id, qty)}
                    />
                  </TableCell>
                  <TableCell>{stockBadge(inv.quantity)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDelete(inv.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {meta && meta.totalPages > 1 && (
            <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
          )}
        </>
      )}

      <AssignInventoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAssign}
        stores={stores}
        products={products}
      />
    </div>
  );
}
