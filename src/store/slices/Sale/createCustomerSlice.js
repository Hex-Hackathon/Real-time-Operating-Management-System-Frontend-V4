import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newCustomer: null,
  loading: false,
  error: null,
};

export const handleCreateCustomer = createAsyncThunk(
  'createCustomer',
  // { name, phone, deli_address, role }
  async (customerData) => {
    const response = await fetch(`${apiBaseUrl}/create_customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create customer!');
    }
  },
);

export const createCustomerSlice = createSlice({
  name: 'createCustomer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateCustomer.pending, (state) => {
        state.loading = true;
        state.newCustomer = null;
        state.error = null;
      })
      .addCase(handleCreateCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.newCustomer = action.payload;
        state.error = null;
      })
      .addCase(handleCreateCustomer.rejected, (state, action) => {
        state.loading = false;
        state.newCustomer = null;
        state.error = action.error.message;
      });
  },
});

export const createCustomerActions = createCustomerSlice.actions;

export default createCustomerSlice.reducer;
