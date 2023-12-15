import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newOrder: null,
  loading: false,
  error: null,
};

export const handleCreateOrder = createAsyncThunk(
  'createOrder',
  // { customer_id, expected_date }
  async (orderData) => {
    const response = await fetch(`${apiBaseUrl}/orders`, {
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
      throw new Error('Create Order Failed');
    }
  },
);

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateOrder.pending, (state) => {
        state.loading = true;
        state.newOrder = null;
        state.error = null;
      })
      .addCase(handleCreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload;
        state.error = null;
      })
      .addCase(handleCreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.newOrder = null;
        state.error = action.error.message;
      });
  },
});

export const createOrderActions = createOrderSlice.actions;

export default createOrderSlice.reducer;
