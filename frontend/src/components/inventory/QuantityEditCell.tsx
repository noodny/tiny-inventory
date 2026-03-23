import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  value: number;
  onSave: (quantity: number) => Promise<void>;
}

export default function QuantityEditCell({ value, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [qty, setQty] = useState(String(value));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    const parsed = parseInt(qty, 10);
    if (isNaN(parsed) || parsed < 0) {
      setError('Must be >= 0');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(parsed);
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <button
        onClick={() => { setQty(String(value)); setEditing(true); setError(''); }}
        className="text-left hover:underline cursor-pointer"
        title="Click to edit"
      >
        {value}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        min="0"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="h-7 w-20"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') setEditing(false);
        }}
      />
      <Button size="sm" variant="ghost" onClick={handleSave} disabled={saving} className="h-7 px-2">
        {saving ? '...' : 'Save'}
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="h-7 px-2">
        Cancel
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
