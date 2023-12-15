import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  isAdded: false,
  loading: false,
  error: null,
};

export const handleAddStock = createAsyncThunk(
  'stocks/addStock',
  // { product_name , quantity }
  async (newStockData) => {
    const response = await fetch(`${apiBaseUrl}/add-stock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStockData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Add Stock Failed');
    }
  },
);

export const addStockSlice = createSlice({
  name: 'addStock',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleAddStock.pending, (state) => {
        state.loading = true;
        state.isAdded = false;
        state.error = null;
      })
      .addCase(handleAddStock.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.error = null;
      })
      .addCase(handleAddStock.rejected, (state, action) => {
        state.loading = false;
        state.isAdded = false;
        state.error = action.error.message;
      });
  },
});

export const addStockActions = addStockSlice.actions;

export default addStockSlice.reducer;
