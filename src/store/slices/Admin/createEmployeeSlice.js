import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newEmployee: null,
  loading: false,
  error: null,
};

export const handleCreateEmployee = createAsyncThunk(
  'employee/createEmployee',
  // { name, email, phone, role, department, password }
  async (employeeData) => {
    const response = await fetch(`${apiBaseUrl}/create-employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create employee!');
    }
  },
);

export const createEmployeeSlice = createSlice({
  name: 'createEmployee',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateEmployee.pending, (state) => {
        state.loading = true;
        state.newEmployee = null;
        state.error = null;
      })
      .addCase(handleCreateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.newEmployee = action.payload;
        state.error = null;
      })
      .addCase(handleCreateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.newEmployee = null;
        state.error = action.error.message;
      });
  },
});

export const createEmployeeActions = createEmployeeSlice.actions;

export default createEmployeeSlice.reducer;
