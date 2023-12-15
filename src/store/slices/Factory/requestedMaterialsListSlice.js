import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  requestedMaterialsList: [],
  loading: false,
  error: null,
};

export const handleGetRequestedMaterialsList = createAsyncThunk(
  'requestedMaterials/requestedMaterialsList',
  // Date
  async (date) => {
    const response = await fetch(`${apiBaseUrl}/requested-materials/${date}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get Requested Materials List');
    }
  },
);

export const requestedMaterialsListSlice = createSlice({
  name: 'requestedMaterialsList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetRequestedMaterialsList.pending, (state) => {
        state.loading = true;
        state.requestedMaterialsList = [];
        state.error = null;
      })
      .addCase(handleGetRequestedMaterialsList.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedMaterialsList = action.payload;
        state.error = null;
      })
      .addCase(handleGetRequestedMaterialsList.rejected, (state, action) => {
        state.loading = false;
        state.requestedMaterialsList = [];
        state.error = action.error.message;
      });
  },
});

export const requestedMaterialsListActions =
  requestedMaterialsListSlice.actions;

export default requestedMaterialsListSlice.reducer;
