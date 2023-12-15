//requestRawSlice;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newRequest: null,
  loading: false,
  error: null,
};

export const handleRequestRaw = createAsyncThunk(
  'requestRaw',
  // { name, phone, deli_address, role }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/request-stock`, {
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
      throw new Error('Cannot create raw request!');
    }
  },
);

export const createRequestRawSlice = createSlice({
  name: 'requestRaw',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleRequestRaw.pending, (state) => {
        state.loading = true;
        state.newCustomer = null;
        state.error = null;
      })
      .addCase(handleRequestRaw.fulfilled, (state, action) => {
        state.loading = false;
        state.newCustomer = action.payload;
        state.error = null;
      })
      .addCase(handleRequestRaw.rejected, (state, action) => {
        state.loading = false;
        state.newCustomer = null;
        state.error = action.error.message;
      });
  },
});

export const createRequestRawActions = createRequestRawSlice.actions;

export default createRequestRawSlice.reducer;
