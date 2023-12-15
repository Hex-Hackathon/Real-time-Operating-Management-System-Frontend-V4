import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  orderAnalysis: null,
  loading: false,
  error: null,
};

export const handleGetOrderAnalysis = createAsyncThunk(
  'orders/orderAnalysis',
  // { analysisTime, analyzedBy }
  async (orderAnalysisData) => {
    const response = await fetch(
      `${apiBaseUrl}/order-analysis?analysisTime=${orderAnalysisData.analysisTime}&analyzedBy=${orderAnalysisData.analyzedBy}`,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get Orders Analysis!');
    }
  },
);

export const orderAnalysisSlice = createSlice({
  name: 'orderAnalysis',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrderAnalysis.pending, (state) => {
        state.loading = true;
        state.orderAnalysis = null;
        state.error = null;
      })
      .addCase(handleGetOrderAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.orderAnalysis = action.payload;
        state.error = null;
      })
      .addCase(handleGetOrderAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.orderAnalysis = null;
        state.error = action.error.message;
      });
  },
});

export const orderAnalysisActions = orderAnalysisSlice.actions;

export default orderAnalysisSlice.reducer;
