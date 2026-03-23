import { PRODUCT_CATEGORIES } from 'tiny-inventory-shared';
import type { Store } from 'tiny-inventory-shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Filters {
  storeId: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  stockLevel: string;
}

interface Props {
  filters: Filters;
  stores: Store[];
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export const emptyFilters: Filters = {
  storeId: 'all',
  category: '',
  minPrice: '',
  maxPrice: '',
  stockLevel: '',
};

export type { Filters as InventoryFilters };

const STOCK_LEVEL_LABELS: Record<string, string> = {
  all: 'All',
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

export default function InventoryFiltersBar({ filters, stores, onChange, onReset }: Props) {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasFilters = filters.storeId !== 'all' ||
    filters.category !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.stockLevel !== '';

  const storeLabel = filters.storeId === 'all'
    ? 'All stores'
    : stores.find((s) => String(s.id) === filters.storeId)?.name ?? filters.storeId;

  const stockLabel = STOCK_LEVEL_LABELS[filters.stockLevel || 'all'] ?? 'All';
  const categoryLabel = filters.category || 'All';

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="space-y-1">
        <Label className="text-xs">Store</Label>
        <Select value={filters.storeId} onValueChange={(v) => update('storeId', v ?? 'all')}>
          <SelectTrigger className="h-9 w-48" data-test="filter-store">
            <SelectValue placeholder={storeLabel}>{storeLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stores</SelectItem>
            {stores.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Category</Label>
        <Select value={filters.category || 'all'} onValueChange={(v) => update('category', v === 'all' ? '' : (v ?? ''))}>
          <SelectTrigger className="h-9 w-40" data-test="filter-category">
            <SelectValue placeholder={categoryLabel}>{categoryLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="filter-min-price" className="text-xs">Min Price</Label>
        <Input
          id="filter-min-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => update('minPrice', e.target.value)}
          className="h-9 w-24"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="filter-max-price" className="text-xs">Max Price</Label>
        <Input
          id="filter-max-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="999"
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
          className="h-9 w-24"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Stock Level</Label>
        <Select value={filters.stockLevel || 'all'} onValueChange={(v) => update('stockLevel', v === 'all' ? '' : (v ?? ''))}>
          <SelectTrigger className="h-9 w-36" data-test="filter-stock-level">
            <SelectValue placeholder={stockLabel}>{stockLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="h-9">
          Clear
        </Button>
      )}
    </div>
  );
}
