import { configureStore } from '@reduxjs/toolkit';
import products from './productsSlice';

export const store = configureStore({
  reducer: {
    products,
  },
});
