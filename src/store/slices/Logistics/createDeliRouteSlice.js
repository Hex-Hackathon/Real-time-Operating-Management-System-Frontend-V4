import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newDeliRoute: null,
  loading: false,
  error: null,
};

export const handleCreateDeliRoute = createAsyncThunk(
  'createDeliRoute',
  // { truck_id, deperature_date, completed_date, IdsOfOrders }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/create-deli-route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot Create Deli Route!');
    }
  },
);

export const createDeliRouteSlice = createSlice({
  name: 'createDeliRoute',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateDeliRoute.pending, (state) => {
        state.loading = true;
        state.newDeliRoute = null;
        state.error = null;
      })
      .addCase(handleCreateDeliRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.newDeliRoute = action.payload;
        state.error = null;
      })
      .addCase(handleCreateDeliRoute.rejected, (state, action) => {
        state.loading = false;
        state.newDeliRoute = null;
        state.error = action.error.message;
      });
  },
});

export const createDeliRouteActions = createDeliRouteSlice.actions;

export default createDeliRouteSlice.reducer;
