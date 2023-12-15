import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  receipe: null,
  loading: false,
  error: null,
};

export const handleAddRawMaterialToReceipe = createAsyncThunk(
  'receipe/addRawMaterialToReceipe',
  // { receipe_id, raw_material_id, require_raw }
  async (data) => {
    const response = await fetch(`${apiBaseUrl}/add-raw-material-to-receipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot add Raw Materials!');
    }
  },
);

export const addRawMaterialToReceipeSlice = createSlice({
  name: 'addRawMaterialToReceipe',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleAddRawMaterialToReceipe.pending, (state) => {
        state.loading = true;
        state.receipe = null;
        state.error = null;
      })
      .addCase(handleAddRawMaterialToReceipe.fulfilled, (state, action) => {
        state.loading = false;
        state.receipe = action.payload;
        state.error = null;
      })
      .addCase(handleAddRawMaterialToReceipe.rejected, (state, action) => {
        state.loading = false;
        state.receipe = null;
        state.error = action.error.message;
      });
  },
});

export const addRawMaterialToReceipeActions =
  addRawMaterialToReceipeSlice.actions;

export default addRawMaterialToReceipeSlice.reducer;
