import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  incomingPendingOrders: null,
  loading: false,
  error: null,
};

export const handleGetIncomingPendingOrders = createAsyncThunk(
  'orders/incomingPendingOrders',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/incoming_pending_orders`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get incoming pending orders!');
    }
  },
);

export const incomingPendingOrdersSlice = createSlice({
  name: 'incomingPendingOrders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetIncomingPendingOrders.pending, (state) => {
        state.loading = true;
        state.incomingPendingOrders = null;
        state.error = null;
      })
      .addCase(handleGetIncomingPendingOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.incomingPendingOrders = action.payload;
        state.error = null;
      })
      .addCase(handleGetIncomingPendingOrders.rejected, (state, action) => {
        state.loading = false;
        state.incomingPendingOrders = null;
        state.error = action.error.message;
      });
  },
});

export const incomingPendingOrdersActions = incomingPendingOrdersSlice.actions;

export default incomingPendingOrdersSlice.reducer;
