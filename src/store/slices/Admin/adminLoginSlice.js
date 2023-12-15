import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  datas: null,
  loading: false,
  error: null,
};

export const handleLogin = createAsyncThunk(
  'login/admin-login',
  async (userData) => {
    const response = await fetch(`${apiBaseUrl}/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('admin-token', data.token);
      return data;
    } else {
      throw new Error('Login failed');
    }
  },
);

export const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.datas = null;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload;
        state.error = null;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.datas = null;
        state.error = action.error.message;
      });
  },
});

export const loginActions = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
