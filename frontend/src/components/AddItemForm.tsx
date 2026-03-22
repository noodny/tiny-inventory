import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/itemsSlice';
import { createItemSchema } from '@/api/items';

type FormErrors = Partial<Record<string, string>>;

export default function AddItemForm() {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({ name: '', description: '', quantity: '', price: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = createItemSchema.safeParse({
      name: form.name,
      description: form.description || undefined,
      quantity: parseInt(form.quantity, 10),
      price: parseFloat(form.price),
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0]?.toString() ?? 'form';
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(addItem(result.data)).unwrap();
      setForm({ name: '', description: '', quantity: '', price: '' });
    } catch (err) {
      setErrors({ form: String(err) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Add item"
      style={{
        display: 'grid',
        gap: '0.75rem',
        marginBottom: '2rem',
        maxWidth: '480px',
        background: '#fff',
        padding: '1.25rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,.08)',
      }}
    >
      <h2 style={{ fontSize: '1.1rem' }}>Add Item</h2>

      {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}

      <label>
        Name *
        <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        {errors.name && <span style={errorStyle}>{errors.name}</span>}
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </label>

      <label>
        Quantity *
        <input
          name="quantity"
          type="number"
          min={0}
          value={form.quantity}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.quantity && <span style={errorStyle}>{errors.quantity}</span>}
      </label>

      <label>
        Price *
        <input
          name="price"
          type="number"
          min={0}
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        {errors.price && <span style={errorStyle}>{errors.price}</span>}
      </label>

      <button
        type="submit"
        disabled={submitting}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        {submitting ? 'Adding…' : 'Add Item'}
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '0.4rem 0.6rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  marginTop: '0.25rem',
};

const errorStyle: React.CSSProperties = { color: 'red', fontSize: '0.8rem' };
