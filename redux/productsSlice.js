import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  products: [],
  basket: [],
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
      let index = state.basket.findIndex((x) => x.slug === action.payload.slug);
      // Eğer ürün sepette yok ise, basket'a ekle

      if (
        state.basket.find((x) => x.slug === action.payload.slug) === undefined
      ) {
        state.basket.push({ ...action.payload, count: 1 });
      } else {
        if (action.payload.countInStock < state.basket[index].count) {
          alert('Not enough stock');
          return;
        }
        // Eğer ürün sepette varsa, miktarı arttır
        state.basket[index].count++;
      }
    });

    builder.addCase(removeToCartItem.fulfilled, (state, action) => {
      state.basket = state.basket.filter(
        (data) => data.slug !== action.payload.slug
      );
    });
  },
});

export const { changeTest } = productsSlice.actions;

export default productsSlice.reducer;
