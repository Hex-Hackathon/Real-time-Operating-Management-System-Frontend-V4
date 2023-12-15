import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newRawMaterials: null,
  loading: false,
  error: null,
};

export const handleCreateRawMaterials = createAsyncThunk(
  'rawMaterials/createRawMaterials',
  // { raw_material_name, in_stock_count }
  async (newRawMaterialsData) => {
    const response = await fetch(`${apiBaseUrl}/create-raw-materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRawMaterialsData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create Raw Materials!');
    }
  },
);

export const createRawMaterialsSlice = createSlice({
  name: 'createRawMaterials',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateRawMaterials.pending, (state) => {
        state.loading = true;
        state.newRawMaterials = null;
        state.error = null;
      })
      .addCase(handleCreateRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.newRawMaterials = action.payload;
        state.error = null;
      })
      .addCase(handleCreateRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.newRawMaterials = null;
        state.error = action.error.message;
      });
  },
});

export const createRawMaterialsActions = createRawMaterialsSlice.actions;

export default createRawMaterialsSlice.reducer;
