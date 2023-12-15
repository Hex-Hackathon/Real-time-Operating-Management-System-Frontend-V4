import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  deliRoutes: null,
  loading: false,
  error: null,
};

export const handleGetDeliRoutes = createAsyncThunk(
  'deliRoutes',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/deli-routes`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot Get Deli Routes!');
    }
  },
);

export const deliRoutesSlice = createSlice({
  name: 'deliRoutes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetDeliRoutes.pending, (state) => {
        state.loading = true;
        state.deliRoutes = null;
        state.error = null;
      })
      .addCase(handleGetDeliRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.deliRoutes = action.payload;
        state.error = null;
      })
      .addCase(handleGetDeliRoutes.rejected, (state, action) => {
        state.loading = false;
        state.deliRoutes = null;
        state.error = action.error.message;
      });
  },
});

export const deliRoutesActions = deliRoutesSlice.actions;

export default deliRoutesSlice.reducer;
