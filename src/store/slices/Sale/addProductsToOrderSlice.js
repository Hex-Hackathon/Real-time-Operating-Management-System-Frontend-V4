import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  order: null,
  loading: false,
  error: null,
};

export const handleAddProductsToOrder = createAsyncThunk(
  'addProductsToOrder',
  // { order_id, product_id, product_count }
  async (orderData) => {
    const response = await fetch(`${apiBaseUrl}/add_products_to_order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Add Products To Order Failed');
    }
  },
);

export const addProductsToOrderSlice = createSlice({
  name: 'addProductsToOrder',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleAddProductsToOrder.pending, (state) => {
        state.loading = true;
        state.order = null;
        state.error = null;
      })
      .addCase(handleAddProductsToOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(handleAddProductsToOrder.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.error.message;
      });
  },
});

export const addProductsToOrderActions = addProductsToOrderSlice.actions;

export default addProductsToOrderSlice.reducer;
