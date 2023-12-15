import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newAdmin: null,
  loading: false,
  error: null,
};

export const handleCreateAdmin = createAsyncThunk(
  'admin/createAdmin',
  // { name, email, phone, role, department, password }
  async (adminData) => {
    const response = await fetch(`${apiBaseUrl}/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create admin!');
    }
  },
);

export const createAdminSlice = createSlice({
  name: 'createAdmin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateAdmin.pending, (state) => {
        state.loading = true;
        state.newAdmin = null;
        state.error = null;
      })
      .addCase(handleCreateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.newAdmin = action.payload;
        state.error = null;
      })
      .addCase(handleCreateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.newAdmin = null;
        state.error = action.error.message;
      });
  },
});

export const createAdminActions = createAdminSlice.actions;

export default createAdminSlice.reducer;
