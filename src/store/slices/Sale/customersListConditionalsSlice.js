import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  customersListConditionals: null,
  loading: false,
  error: null,
};

export const handleGetCustomersListConditionals = createAsyncThunk(
  'customersListConditionals',
  // { name, phone, deli_address, role }
  async (customerData) => {
    const response = await fetch(
      `${apiBaseUrl}/customer_lists_conditionals?name=${customerData.name}&phone=${customerData.phone}&deli_address=${customerData.deli_address}&role=${customerData.role}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Something Wrong!');
    }
  },
);

export const customersListConditionalsSlice = createSlice({
  name: 'customersListConditionals',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCustomersListConditionals.pending, (state) => {
        state.loading = true;
        state.customersListConditionals = null;
        state.error = null;
      })
      .addCase(
        handleGetCustomersListConditionals.fulfilled,
        (state, action) => {
          state.loading = false;
          state.customersListConditionals = action.payload;
          state.error = null;
        },
      )
      .addCase(handleGetCustomersListConditionals.rejected, (state, action) => {
        state.loading = false;
        state.customersListConditionals = null;
        state.error = action.error.message;
      });
  },
});

export const customersListConditionalsActions =
  customersListConditionalsSlice.actions;

export default customersListConditionalsSlice.reducer;
