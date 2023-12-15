import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  deliRouteDetails: null,
  loading: false,
  error: null,
};

export const handleGetDeliRouteDetails = createAsyncThunk(
  'deli/deliRouteDetails',
  // routeId
  async (route_id) => {
    const response = await fetch(
      `${apiBaseUrl}/deli-route-details/${route_id}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot Get Deli Route Details!');
    }
  },
);

export const deliRouteDetailsSlice = createSlice({
  name: 'deliRouteDetails',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetDeliRouteDetails.pending, (state) => {
        state.loading = true;
        state.deliRouteDetails = null;
        state.error = null;
      })
      .addCase(handleGetDeliRouteDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.deliRouteDetails = action.payload;
        state.error = null;
      })
      .addCase(handleGetDeliRouteDetails.rejected, (state, action) => {
        state.loading = false;
        state.deliRouteDetails = null;
        state.error = action.error.message;
      });
  },
});

export const deliRouteDetailsActions = deliRouteDetailsSlice.actions;

export default deliRouteDetailsSlice.reducer;
