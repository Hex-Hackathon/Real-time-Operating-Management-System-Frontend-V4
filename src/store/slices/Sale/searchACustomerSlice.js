import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  customer: null,
  loading: false,
  error: null,
};

export const handleSearchACustomer = createAsyncThunk(
  'customer/searchACustomer',
  // { name, phone, deli_address, role }
  async (customerData) => {
    const response = await fetch(
      `${apiBaseUrl}/search_a_customer?name=${customerData.name}&phone=${customerData.phone}&deli_address=${customerData.deli_address}&role=${customerData.role}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Something Wrong!');
    }
  },
);

export const searchACustomerSlice = createSlice({
  name: 'searchACustomer',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleSearchACustomer.pending, (state) => {
        state.loading = true;
        state.customer = null;
        state.error = null;
      })
      .addCase(handleSearchACustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(handleSearchACustomer.rejected, (state, action) => {
        state.loading = false;
        state.customer = null;
        state.error = action.error.message;
      });
  },
});

export const searchACustomerActions = searchACustomerSlice.actions;

export default searchACustomerSlice.reducer;
