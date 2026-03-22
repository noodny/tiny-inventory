import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeItem } from '@/store/itemsSlice';

export default function ItemList() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.items);

  if (status === 'loading') {
    return <p>Loading items…</p>;
  }

  if (items.length === 0) {
    return <p>No items yet. Add your first item above.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
          <th style={th}>Name</th>
          <th style={th}>SKU</th>
          <th style={th}>Qty</th>
          <th style={th}>Price</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
            <td style={td}>
              <strong>{item.name}</strong>
              {item.description && (
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{item.description}</div>
              )}
            </td>
            <td style={td}>{item.sku ?? '—'}</td>
            <td style={td}>{item.quantity}</td>
            <td style={td}>${parseFloat(item.price).toFixed(2)}</td>
            <td style={td}>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = { textAlign: 'left', padding: '0.5rem 0.75rem' };
const td: React.CSSProperties = { padding: '0.5rem 0.75rem', verticalAlign: 'top' };
