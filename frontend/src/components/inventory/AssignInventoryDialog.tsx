import { useState, useEffect, useMemo } from 'react';
import type { Store, Product } from 'tiny-inventory-shared';
import { ApiError } from '@/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { storeId: number; productId: number; quantity: number }) => Promise<void>;
  stores: Store[];
  products: Product[];
}

export default function AssignInventoryDialog({ open, onClose, onSubmit, stores, products }: Props) {
  const [storeId, setStoreId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const productOptions = useMemo(
    () => products.filter((p) => p.isActive).map((p) => ({ value: String(p.id), label: `${p.name} (${p.sku})` })),
    [products],
  );

  useEffect(() => {
    if (open) {
      setStoreId('');
      setProductId('');
      setQuantity('0');
      setError('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!storeId || !productId) {
      setError('Store and product are required');
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 0) {
      setError('Quantity must be a non-negative integer');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ storeId: Number(storeId), productId: Number(productId), quantity: qty });
      onClose();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('This product is already assigned to this store');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Product to Store</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Store</Label>
            <Select value={storeId} onValueChange={(v) => setStoreId(v ?? '')}>
              <SelectTrigger data-test="store-select">
                <SelectValue placeholder="Select a store">
                  {storeId ? stores.find((s) => String(s.id) === storeId)?.name ?? storeId : 'Select a store'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {stores.filter((s) => s.isActive).map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Product</Label>
            <Combobox
              options={productOptions}
              value={productId}
              onValueChange={(v) => setProductId(v)}
              placeholder="Search products..."
              data-test="product-select"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assign-qty">Quantity</Label>
            <Input
              id="assign-qty"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Assigning...' : 'Assign'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
