import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  isIncrease: false,
  loading: false,
  error: null,
};

export const handleProductIncrease = createAsyncThunk(
  'product/productIncrease',
  // { product_id, increase }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/product-increase`, {
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
      throw new Error('Cannot Increase Product!');
    }
  },
);

export const productIncreaseSlice = createSlice({
  name: 'productIncrease',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleProductIncrease.pending, (state) => {
        state.loading = true;
        state.isIncrease = false;
        state.error = null;
      })
      .addCase(handleProductIncrease.fulfilled, (state, action) => {
        state.loading = false;
        state.isIncrease = true;
        state.error = null;
      })
      .addCase(handleProductIncrease.rejected, (state, action) => {
        state.loading = false;
        state.isIncrease = false;
        state.error = action.error.message;
      });
  },
});

export const productIncreaseActions = productIncreaseSlice.actions;

export default productIncreaseSlice.reducer;
