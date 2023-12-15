import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  ordersListByMonth: null,
  loading: false,
  error: null,
};

export const handleGetOrdersListByMonth = createAsyncThunk(
  'ordersList/ordersListByMonth',
  // date
  async (date) => {
    const response = await fetch(
      `${apiBaseUrl}/orders-list-by_month?date=${date}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get Orders list by Month!');
    }
  },
);

export const ordersListByMonthSlice = createSlice({
  name: 'ordersListByMonth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrdersListByMonth.pending, (state) => {
        state.loading = true;
        state.ordersListByMonth = null;
        state.error = null;
      })
      .addCase(handleGetOrdersListByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersListByMonth = action.payload;
        state.error = null;
      })
      .addCase(handleGetOrdersListByMonth.rejected, (state, action) => {
        state.loading = false;
        state.ordersListByMonth = null;
        state.error = action.error.message;
      });
  },
});

export const ordersListByMonthActions = ordersListByMonthSlice.actions;

export default ordersListByMonthSlice.reducer;
