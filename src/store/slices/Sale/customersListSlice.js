import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  customersList: null,
  loading: false,
  error: null,
};

export const handleGetCustomersList = createAsyncThunk(
  'customersList',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/customer_lists`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Something Wrong!');
    }
  },
);

export const customersListSlice = createSlice({
  name: 'customersList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCustomersList.pending, (state) => {
        state.loading = true;
        state.customersList = null;
        state.error = null;
      })
      .addCase(handleGetCustomersList.fulfilled, (state, action) => {
        state.loading = false;
        state.customersList = action.payload;
        state.error = null;
      })
      .addCase(handleGetCustomersList.rejected, (state, action) => {
        state.loading = false;
        state.customersList = null;
        state.error = action.error.message;
      });
  },
});

export const customersListActions = customersListSlice.actions;

export default customersListSlice.reducer;
