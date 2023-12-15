import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {

  datas: null,
  loading: false,
  error: null,
};

export const handleCreateTruck = createAsyncThunk(
  'createTrucks',
  async (truckData) => {
    const response = await fetch(`${apiBaseUrl}/create-truck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(truckData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create trucks!');
    }
  },
);

export const createTruckSlice = createSlice({
  name: 'createTrucks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateTruck.pending, (state) => {
        state.loading = true;

        state.datas = null;

        state.error = null;
      })
      .addCase(handleCreateTruck.fulfilled, (state, action) => {
        state.loading = false;

        state.datas = action.payload;

        state.error = null;
      })
      .addCase(handleCreateTruck.rejected, (state, action) => {
        state.loading = false;

        state.datas = null;

        state.error = action.error.message;
      });
  },
});

export const createTruckActions = createTruckSlice.actions;

export default createTruckSlice.reducer;
