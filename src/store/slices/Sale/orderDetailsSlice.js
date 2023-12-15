import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  orderDetails: null,
  loading: false,
  error: null,
};

export const handleGetOrderDetails = createAsyncThunk(
  'orders/orderDetails',
  // orderId
  async (orderId) => {
    const response = await fetch(`${apiBaseUrl}/order_details/${orderId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get the order details!');
    }
  },
);

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrderDetails.pending, (state) => {
        state.loading = true;
        state.orderDetails = null;
        state.error = null;
      })
      .addCase(handleGetOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })
      .addCase(handleGetOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.orderDetails = null;
        state.error = action.error.message;
      });
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
