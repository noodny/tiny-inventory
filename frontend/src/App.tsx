import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchItems } from './store/itemsSlice';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';

export default function App() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [dispatch, status]);

  return (
    <main>
      <h1 style={{ marginBottom: '1.5rem' }}>Tiny Inventory</h1>

      {error && (
        <p role="alert" style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </p>
      )}

      <AddItemForm />
      <ItemList />
    </main>
  );
}
