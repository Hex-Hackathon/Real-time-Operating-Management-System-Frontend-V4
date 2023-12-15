import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  pendingOrdersList: null,
  loading: false,
  error: null,
};

export const handleGetPendingOrdersList = createAsyncThunk(
  'pendingOrdersList',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/pending_orders_list`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get the pending orders list');
    }
  },
);

export const pendingOrdersListSlice = createSlice({
  name: 'pendingOrdersList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetPendingOrdersList.pending, (state) => {
        state.loading = true;
        state.pendingOrdersList = null;
        state.error = null;
      })
      .addCase(handleGetPendingOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingOrdersList = action.payload;
        state.error = null;
      })
      .addCase(handleGetPendingOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.pendingOrdersList = null;
        state.error = action.error.message;
      });
  },
});

export const pendingOrdersListActions = pendingOrdersListSlice.actions;

export default pendingOrdersListSlice.reducer;
