import { useEffect, useState, useCallback } from 'react';
import type { Product, CreateProduct } from 'tiny-inventory-shared';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, addProduct, editProduct, removeProduct } from '@/store/productsSlice';
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
import ProductFormDialog from '@/components/products/ProductFormDialog';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, meta, status, error } = useAppSelector((s) => s.products);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [actionError, setActionError] = useState('');

  const load = useCallback(
    (p = page) => {
      dispatch(fetchProducts({ page: p, pageSize: 20 }));
    },
    [dispatch, page],
  );

  useEffect(() => {
    load(page);
  }, [load, page]);

  const handleCreate = async (data: CreateProduct) => {
    await dispatch(addProduct(data)).unwrap();
    load(1);
    setPage(1);
  };

  const handleEdit = async (data: CreateProduct) => {
    if (!editingProduct) return;
    await dispatch(editProduct({ id: editingProduct.id, input: data })).unwrap();
    load();
  };

  const handleDeactivate = async (product: Product) => {
    setActionError('');
    try {
      await dispatch(editProduct({ id: product.id, input: { isActive: !product.isActive } })).unwrap();
      load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.body.message : 'Failed to update product');
    }
  };

  const handleDelete = async (id: number) => {
    setActionError('');
    try {
      await dispatch(removeProduct(id)).unwrap();
      load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.body.message : 'Failed to delete product');
    }
  };

  const openCreate = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button onClick={openCreate}>New Product</Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {actionError && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {actionError}
            <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setActionError('')}>✕</Button>
          </AlertDescription>
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
          title="No products yet"
          description="Create your first product to get started."
          action={<Button onClick={openCreate}>New Product</Button>}
        />
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    ${parseFloat(product.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.isActive ? 'default' : 'secondary'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(product)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeactivate(product)}
                    >
                      {product.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDelete(product.id)}
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

      <ProductFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={editingProduct ? handleEdit : handleCreate}
        product={editingProduct}
      />
    </div>
  );
}
