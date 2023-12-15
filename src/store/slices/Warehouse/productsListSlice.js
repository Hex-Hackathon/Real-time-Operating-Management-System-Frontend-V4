import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  productsList: null,
  loading: false,
  error: null,
};

export const handleGetProductsList = createAsyncThunk(
  'product/productsList',
  // do not need parameters
  async () => {
    const response = await fetch(`${apiBaseUrl}/product-lists`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot Get Products List!');
    }
  },
);

export const productsListSlice = createSlice({
  name: 'productsList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProductsList.pending, (state) => {
        state.loading = true;
        state.productsList = null;
        state.error = null;
      })
      .addCase(handleGetProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.productsList = action.payload;
        state.error = null;
      })
      .addCase(handleGetProductsList.rejected, (state, action) => {
        state.loading = false;
        state.productsList = null;
        state.error = action.error.message;
      });
  },
});

export const productListsActions = productsListSlice.actions;

export default productsListSlice.reducer;
