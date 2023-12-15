import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

//Auth State
const initialTruckListState = {
  data: null,
  loading: false,
  error: null,
};

export const TruckListfunc = createAsyncThunk('TruckList', async () => {
  // Make GET request to login API and get response
  const response = await fetch(`${apiBaseUrl}/truck-lists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // If login successful, return JSON data
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    // If login fails, throw an error
    throw new Error('No Truck Data');
  }
});

const TruckListSlice = createSlice({
  name: 'TruckList',
  initialState: initialTruckListState,
  extraReducers: (builder) => {
    builder
      .addCase(TruckListfunc.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(TruckListfunc.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(TruckListfunc.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const TruckListActions = TruckListSlice.actions;

export default TruckListSlice.reducer;
