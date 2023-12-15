import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiBaseUrl } from "../../../utils";

const initialState = {
  datas: null,
  loading: false,
  error: null,
};

export const handleLogin = createAsyncThunk(
  "login/logistics-login",
  async (userData, thunkAPI) => {
    const response = await fetch(`${apiBaseUrl}/logistics-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("logistics-token", data.token);
      return data;
    } else {
      throw new Error("Login failed");
    }
  }
);

export const logisticsLoginSlice = createSlice({
  name: "login/logisticsLogin",
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

export const loginActions = logisticsLoginSlice.actions;

export default logisticsLoginSlice.reducer;
