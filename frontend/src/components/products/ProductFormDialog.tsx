import { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from 'tiny-inventory-shared';
import type { Product, CreateProduct } from 'tiny-inventory-shared';
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
  onSubmit: (data: CreateProduct) => Promise<void>;
  product?: Product | null;
}

export default function ProductFormDialog({ open, onClose, onSubmit, product }: Props) {
  const [form, setForm] = useState({ sku: '', name: '', category: '', description: '', price: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        sku: product?.sku ?? '',
        name: product?.name ?? '',
        category: product?.category ?? '',
        description: product?.description ?? '',
        price: product?.price ?? '',
      });
      setError('');
    }
  }, [open, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.sku.trim() || !form.name.trim() || !form.category || !form.price) {
      setError('SKU, name, category, and price are required');
      return;
    }

    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      setError('Price must be a non-negative number');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        sku: form.sku.trim(),
        name: form.name.trim(),
        category: form.category as CreateProduct['category'],
        description: form.description.trim() || null,
        price,
      });
      onClose();
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setError('A product with this SKU already exists');
      } else {
        setError(err instanceof ApiError ? err.body.message : 'An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Create Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product-sku">SKU</Label>
              <Input
                id="product-sku"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="e.g. KB-001"
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-name">Name</Label>
              <Input
                id="product-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((prev) => ({ ...prev, category: v ?? '' }))}
              >
                <SelectTrigger data-test="category-select">
                  <SelectValue placeholder="Select category">{form.category || 'Select category'}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-price">Price</Label>
              <Input
                id="product-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Input
              id="product-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Optional description"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : product ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
