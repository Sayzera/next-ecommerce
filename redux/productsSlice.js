import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  products: [],
  basket: Cookies.get('products') ? JSON.parse(Cookies.get('products')) : [],
  loading: false,
  error: null,
  test: 'Ramazan',
};

export const addToCart = createAsyncThunk(
  'products/addToCart',
  async (product, { rejectWithValue }) => {
    // state
    return product;
  }
);

export const updateQuantity = createAsyncThunk(
  'products/updateQuantity',
  async (data, { rejectWithValue }) => {
    return data;
  }
);

export const removeToCartItem = createAsyncThunk(
  'products/removeToCartItem',
  async (product, { rejectWithValue }) => {
    return product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeTest: (state, action) => {
      state.test = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      let products = JSON.parse(Cookies.get('products'));

      let index = products.findIndex((x) => x.slug === action.payload.slug);
      // Eğer ürün sepette yok ise, basket'a ekle

      if (
        state.basket.find((x) => x.slug === action.payload.slug) === undefined
      ) {
        Cookies.set(
          'products',
          JSON.stringify([{ ...action.payload, count: 1 }])
        );

        state.basket.push({ ...action.payload, count: 1 });
      } else {
        if (action.payload.countInStock < state.basket[index].count) {
          alert('Not enough stock');
          return;
        }
        // Eğer ürün sepette varsa, miktarı arttır
        products[index].count += 1;
        Cookies.set('products', JSON.stringify(products));
        state.basket[index].count++;
      }
    });

    builder.addCase(removeToCartItem.fulfilled, (state, action) => {
      state.basket = state.basket.filter(
        (data) => data.slug !== action.payload.slug
      );
    });

    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      let products = JSON.parse(Cookies.get('products'));

      let index = products.findIndex((x) => x.slug === action.payload.slug);
      products[index].count = Number(action.payload.qty);
      Cookies.set('products', JSON.stringify(products));
      state.basket[index].count = Number(action.payload.qty);
    });
  },
});

export const { changeTest } = productsSlice.actions;

export default productsSlice.reducer;
