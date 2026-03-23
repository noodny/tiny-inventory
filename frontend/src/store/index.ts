import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './storesSlice';
import productsReducer from './productsSlice';
import inventoryReducer from './inventorySlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
    products: productsReducer,
    inventory: inventoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
