import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  test: 'Ramazan',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (data, { rejectWithValue }) => {
    return [
      {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
      },
    ];
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
    builder.addCase(fetchProducts.pending, (state, action) => {});

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.test = action.payload[0].name;
    });
  },
});

export const { changeTest } = productsSlice.actions;

export default productsSlice.reducer;
