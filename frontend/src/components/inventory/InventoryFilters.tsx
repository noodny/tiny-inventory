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
  category: string;
  minPrice: string;
  maxPrice: string;
  stockLevel: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export const emptyFilters: Filters = {
  category: '',
  minPrice: '',
  maxPrice: '',
  stockLevel: '',
};

export type { Filters as InventoryFilters };

export default function InventoryFiltersBar({ filters, onChange, onReset }: Props) {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="space-y-1">
        <Label htmlFor="filter-category" className="text-xs">Category</Label>
        <Input
          id="filter-category"
          placeholder="e.g. Peripherals"
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
          className="h-9 w-40"
        />
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
        <Select value={filters.stockLevel} onValueChange={(v) => update('stockLevel', v ?? '')}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="All" />
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
