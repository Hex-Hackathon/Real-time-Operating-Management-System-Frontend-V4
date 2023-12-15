import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  employeesList: null,
  loading: false,
  error: null,
};

export const handleGetEmployeesList = createAsyncThunk(
  'employee/employeesList',
  // { start, end }
  async (data) => {
    const response = await fetch(
      `${apiBaseUrl}/employee-list/${data.start}/${data.end}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get employees list!');
    }
  },
);

export const employeesListSlice = createSlice({
  name: 'employeesList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetEmployeesList.pending, (state) => {
        state.loading = true;
        state.employeesList = null;
        state.error = null;
      })
      .addCase(handleGetEmployeesList.fulfilled, (state, action) => {
        state.loading = false;
        state.employeesList = action.payload;
        state.error = null;
      })
      .addCase(handleGetEmployeesList.rejected, (state, action) => {
        state.loading = false;
        state.employeesList = null;
        state.error = action.error.message;
      });
  },
});

export const employeesListActions = employeesListSlice.actions;

export default employeesListSlice.reducer;
