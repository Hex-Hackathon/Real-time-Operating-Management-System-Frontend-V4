import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  ordersListByDeliDay: null,
  loading: false,
  error: null,
};

export const handleGetOrdersListByDeliDay = createAsyncThunk(
  'orders/ordersListByDeliDay',
  // Date
  async (date) => {
    const response = await fetch(
      `${apiBaseUrl}/orders_list_by_deli_day/${date}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get the orders list by deli day');
    }
  },
);

export const ordersListByDeliDaySlice = createSlice({
  name: 'ordersListByDeliDay',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrdersListByDeliDay.pending, (state) => {
        state.loading = true;
        state.ordersListByDeliDay = null;
        state.error = null;
      })
      .addCase(handleGetOrdersListByDeliDay.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersListByDeliDay = action.payload;
        state.error = null;
      })
      .addCase(handleGetOrdersListByDeliDay.rejected, (state, action) => {
        state.loading = false;
        state.ordersListByDeliDay = null;
        state.error = action.error.message;
      });
  },
});

export const ordersListByDeliDayActions = ordersListByDeliDaySlice.actions;

export default ordersListByDeliDaySlice.reducer;
