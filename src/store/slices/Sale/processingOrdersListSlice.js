import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  processingOrdersList: null,
  loading: false,
  error: null,
};

export const handleGetProcessingOrdersList = createAsyncThunk(
  'processingOrdersList',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/processing_orders_list`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get the processing orders list');
    }
  },
);

export const processingOrdersListSlice = createSlice({
  name: 'processingOrdersList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProcessingOrdersList.pending, (state) => {
        state.loading = true;
        state.processingOrdersList = null;
        state.error = null;
      })
      .addCase(handleGetProcessingOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.processingOrdersList = action.payload;
        state.error = null;
      })
      .addCase(handleGetProcessingOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.processingOrdersList = null;
        state.error = action.error.message;
      });
  },
});

export const processingOrdersListActions = processingOrdersListSlice.actions;

export default processingOrdersListSlice.reducer;
