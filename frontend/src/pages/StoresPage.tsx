import { useEffect, useState, useCallback } from 'react';
import type { Store } from 'tiny-inventory-shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchStores } from '@/store/storesSlice';
import * as api from '@/api/stores';
import { ApiError } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import StoreFormDialog from '@/components/stores/StoreFormDialog';

export default function StoresPage() {
  const dispatch = useAppDispatch();
  const { items, meta, status, error } = useAppSelector((s) => s.stores);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [actionError, setActionError] = useState('');

  const load = useCallback(
    (p = page) => {
      dispatch(fetchStores({ page: p, pageSize: 20 }));
    },
    [dispatch, page],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);

  const handleCreate = async (data: { name: string }) => {
    await api.createStore(data);
    load(1);
    setPage(1);
  };

  const handleEdit = async (data: { name: string }) => {
    if (!editingStore) return;
    await api.updateStore(editingStore.id, data);
    load();
  };

  const handleDeactivate = async (store: Store) => {
    setActionError('');
    try {
      await api.updateStore(store.id, { isActive: !store.isActive });
      load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.body.message : 'Failed to update store');
    }
  };

  const handleDelete = async (id: number) => {
    setActionError('');
    try {
      await api.deleteStore(id);
      load();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setActionError(err.body.message);
      } else {
        setActionError(err instanceof ApiError ? err.body.message : 'Failed to delete store');
      }
    }
  };

  const openCreate = () => {
    setEditingStore(null);
    setDialogOpen(true);
  };

  const openEdit = (store: Store) => {
    setEditingStore(store);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Stores</h2>
        <Button onClick={openCreate}>New Store</Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {actionError && (
        <Alert variant="destructive">
          <AlertDescription>{actionError}</AlertDescription>
        </Alert>
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
          title="No stores yet"
          description="Create your first store to get started."
          action={<Button onClick={openCreate}>New Store</Button>}
        />
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>
                    <Badge variant={store.isActive ? 'default' : 'secondary'}>
                      {store.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(store)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeactivate(store)}
                    >
                      {store.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDelete(store.id)}
                    >
                      Delete
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

      <StoreFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={editingStore ? handleEdit : handleCreate}
        store={editingStore}
      />
    </div>
  );
}
