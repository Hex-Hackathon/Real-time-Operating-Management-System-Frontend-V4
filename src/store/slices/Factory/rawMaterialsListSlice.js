import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  rawMaterialsList: [],
  loading: false,
  error: null,
};

export const handleGetRawMaterialsList = createAsyncThunk(
  'rawMaterials/rawMaterialsList',
  // do not need parameter
  async () => {
    const response = await fetch(`${apiBaseUrl}/raw-materials-list`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get Raw Materials List');
    }
  },
);

export const rawMaterialsListSlice = createSlice({
  name: 'rawMaterialsList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetRawMaterialsList.pending, (state) => {
        state.loading = true;
        state.rawMaterialsList = [];
        state.error = null;
      })
      .addCase(handleGetRawMaterialsList.fulfilled, (state, action) => {
        state.loading = false;
        state.rawMaterialsList = action.payload;
        state.error = null;
      })
      .addCase(handleGetRawMaterialsList.rejected, (state, action) => {
        state.loading = false;
        state.rawMaterialsList = [];
        state.error = action.error.message;
      });
  },
});

export const rawMaterialsListActions = rawMaterialsListSlice.actions;

export default rawMaterialsListSlice.reducer;
