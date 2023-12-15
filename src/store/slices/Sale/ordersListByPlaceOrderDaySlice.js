import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  ordersListByPlaceOrderDay: null,
  loading: false,
  error: null,
};

export const handleGetOrdersListByPlaceOrderDaySlice = createAsyncThunk(
  'orders/ordersListByPlaceOrderDay',
  // Date
  async (date) => {
    const response = await fetch(
      `${apiBaseUrl}/orders_list_by_place_order_day/${date}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get the orders list by place order day');
    }
  },
);

export const ordersListByPlaceOrderDaySlice = createSlice({
  name: 'ordersListByPlaceOrderDay',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrdersListByPlaceOrderDaySlice.pending, (state) => {
        state.loading = true;
        state.ordersListByPlaceOrderDay = null;
        state.error = null;
      })
      .addCase(
        handleGetOrdersListByPlaceOrderDaySlice.fulfilled,
        (state, action) => {
          state.loading = false;
          state.ordersListByPlaceOrderDay = action.payload;
          state.error = null;
        },
      )
      .addCase(
        handleGetOrdersListByPlaceOrderDaySlice.rejected,
        (state, action) => {
          state.loading = false;
          state.ordersListByPlaceOrderDay = null;
          state.error = action.error.message;
        },
      );
  },
});

export const ordersListByPlaceOrderDayActions =
  ordersListByPlaceOrderDaySlice.actions;

export default ordersListByPlaceOrderDaySlice.reducer;
