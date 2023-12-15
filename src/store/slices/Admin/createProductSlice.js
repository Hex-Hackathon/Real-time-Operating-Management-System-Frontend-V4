import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newProduct: null,
  loading: false,
  error: null,
};

export const handleCreateProduct = createAsyncThunk(
  'product/createProduct',
  // { product_name, in_stock_count }
  async (newProductData) => {
    const response = await fetch(`${apiBaseUrl}/create-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create product!');
    }
  },
);

export const createProductSlice = createSlice({
  name: 'createProduct',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateProduct.pending, (state) => {
        state.loading = true;
        state.newProduct = null;
        state.error = null;
      })
      .addCase(handleCreateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newProduct = action.payload;
        state.error = null;
      })
      .addCase(handleCreateProduct.rejected, (state, action) => {
        state.loading = false;
        state.newProduct = null;
        state.error = action.error.message;
      });
  },
});

export const createProductActions = createProductSlice.actions;

export default createProductSlice.reducer;
