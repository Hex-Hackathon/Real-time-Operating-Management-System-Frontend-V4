import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  requestedProducts: [],
  loading: false,
  error: null,
};

export const handleGetRequestedProducts = createAsyncThunk(
  'requestedProducts/requestedProductsSlice',
  // Date
  async (date) => {
    const response = await fetch(`${apiBaseUrl}/requested-stocks/${date}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get Requested Products');
    }
  },
);

export const requestedProductsSlice = createSlice({
  name: 'requestedProducts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetRequestedProducts.pending, (state) => {
        state.loading = true;
        state.requestedProducts = [];
        state.error = null;
      })
      .addCase(handleGetRequestedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedProducts = action.payload;
        state.error = null;
      })
      .addCase(handleGetRequestedProducts.rejected, (state, action) => {
        state.loading = false;
        state.requestedProducts = [];
        state.error = action.error.message;
      });
  },
});

export const requestedProductsActions = requestedProductsSlice.actions;

export default requestedProductsSlice.reducer;
