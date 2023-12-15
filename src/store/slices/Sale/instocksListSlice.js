import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  instocksList: null,
  loading: false,
  error: null,
};

export const handleGetInstocksList = createAsyncThunk(
  'instocksList',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/instock-lists`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Something Wrong!');
    }
  },
);

export const instocksListSlice = createSlice({
  name: 'instocksList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetInstocksList.pending, (state) => {
        state.loading = true;
        state.instocksList = null;
        state.error = null;
      })
      .addCase(handleGetInstocksList.fulfilled, (state, action) => {
        state.loading = false;
        state.instocksList = action.payload;
        state.error = null;
      })
      .addCase(handleGetInstocksList.rejected, (state, action) => {
        state.loading = false;
        state.instocksList = null;
        state.error = action.error.message;
      });
  },
});

export const instocksListActions = instocksListSlice.actions;

export default instocksListSlice.reducer;
