import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  isDecrease: false,
  loading: false,
  error: null,
};

export const handleProductDecrease = createAsyncThunk(
  'product/productDecrease',
  // { product_id, decrease }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/product-decrease`, {
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
      throw new Error('Cannot Decrease Product!');
    }
  },
);

export const productDecreaseSlice = createSlice({
  name: 'productDecrease',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleProductDecrease.pending, (state) => {
        state.loading = true;
        state.isDecrease = false;
        state.error = null;
      })
      .addCase(handleProductDecrease.fulfilled, (state, action) => {
        state.loading = false;
        state.isDecrease = true;
        state.error = null;
      })
      .addCase(handleProductDecrease.rejected, (state, action) => {
        state.loading = false;
        state.isDecrease = false;
        state.error = action.error.message;
      });
  },
});

export const productDecreaseActions = productDecreaseSlice.actions;

export default productDecreaseSlice.reducer;
