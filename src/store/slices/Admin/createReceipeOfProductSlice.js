import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newReceipeOfProduct: null,
  loading: false,
  error: null,
};

export const handleCreateReceipeOfProduct = createAsyncThunk(
  'product/createReceipeOfProduct',
  // { product_id }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/create-receipe-of-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create Receipe of product!');
    }
  },
);

export const createReceipeOfProductSlice = createSlice({
  name: 'createReceipeOfProduct',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateReceipeOfProduct.pending, (state) => {
        state.loading = true;
        state.newReceipeOfProduct = null;
        state.error = null;
      })
      .addCase(handleCreateReceipeOfProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newReceipeOfProduct = action.payload;
        state.error = null;
      })
      .addCase(handleCreateReceipeOfProduct.rejected, (state, action) => {
        state.loading = false;
        state.newReceipeOfProduct = null;
        state.error = action.error.message;
      });
  },
});

export const createReceipeOfProductActions =
  createReceipeOfProductSlice.actions;

export default createReceipeOfProductSlice.reducer;
