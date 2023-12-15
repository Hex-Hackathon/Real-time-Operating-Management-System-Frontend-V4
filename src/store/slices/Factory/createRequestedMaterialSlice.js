import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  newRequestedMaterial: [], // 1
  loading: false,
  error: null,
};

export const handleCreateRequestedMaterial = createAsyncThunk(
  'requestedMaterial/createRequestedMaterial',
  // { material_name , quantity , budget  }
  async (newRequestedMaterialData) => {
    const response = await fetch(`${apiBaseUrl}/requested-materials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRequestedMaterialData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot create Requested Material!');
    }
  },
);

export const createRequestedMaterialSlice = createSlice({
  name: 'createRequestedMaterial',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateRequestedMaterial.pending, (state) => {
        state.loading = true;
        state.newRequestedMaterial = []; // 2
        state.error = null;
      })
      .addCase(handleCreateRequestedMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.newRequestedMaterial = action.payload;
        state.error = null;
      })
      .addCase(handleCreateRequestedMaterial.rejected, (state, action) => {
        state.loading = false;
        state.newRequestedMaterial = []; // 3
        state.error = action.error.message;
      });
  },
});

export const createRequestedMaterialActions =
  createRequestedMaterialSlice.actions;

export default createRequestedMaterialSlice.reducer;
