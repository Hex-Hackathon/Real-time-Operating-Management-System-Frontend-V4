import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  isDeleted: false,
  loading: false,
  error: null,
};

export const handleDeleteStock = createAsyncThunk(
  'stocks/deleteStock',
  // stockId
  async (stockId) => {
    const response = await fetch(`${apiBaseUrl}/remove-stock/${stockId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Delete Stock Failed');
    }
  },
);

export const deleteStockSlice = createSlice({
  name: 'deleteStock',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleDeleteStock.pending, (state) => {
        state.loading = true;
        state.isDeleted = false;
        state.error = null;
      })
      .addCase(handleDeleteStock.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = true;
        state.error = null;
      })
      .addCase(handleDeleteStock.rejected, (state, action) => {
        state.loading = false;
        state.isDeleted = false;
        state.error = action.error.message;
      });
  },
});

export const deleteStockActions = deleteStockSlice.actions;

export default deleteStockSlice.reducer;
