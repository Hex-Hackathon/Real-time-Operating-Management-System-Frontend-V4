import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  isOrderProcessConfirmed: false,
  loading: false,
  error: null,
};

export const handleOrderProcessConfirm = createAsyncThunk(
  'OrderProcessConfirm',
  // { order_id }
  async (orderData) => {
    const response = await fetch(`${apiBaseUrl}/order_process_confirm`, {
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
      throw new Error('Something Wrong!');
    }
  },
);

export const orderProcessConfirmSlice = createSlice({
  name: 'orderProcessConfirm',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleOrderProcessConfirm.pending, (state) => {
        state.loading = true;
        state.isOrderProcessConfirmed = false;
        state.error = null;
      })
      .addCase(handleOrderProcessConfirm.fulfilled, (state, action) => {
        state.loading = false;
        state.isOrderProcessConfirmed = true;
        state.error = null;
      })
      .addCase(handleOrderProcessConfirm.rejected, (state, action) => {
        state.loading = false;
        state.isOrderProcessConfirmed = false;
        state.error = action.error.message;
      });
  },
});

export const orderProcessConfirmActions = orderProcessConfirmSlice.actions;

export default orderProcessConfirmSlice.reducer;
