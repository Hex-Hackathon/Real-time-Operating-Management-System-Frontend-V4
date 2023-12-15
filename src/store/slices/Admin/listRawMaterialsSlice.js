import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiBaseUrl } from '../../../utils';

const initialState = {
  listRawMaterials: null,
  loading: false,
  error: null,
};

export const handleGetListRawMaterials = createAsyncThunk(
  'rawMaterials/listRawMaterials',
  // do not need parameter
  async () => {
    const response = await fetch(`${apiBaseUrl}/list-raw-materials`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Cannot get list raw materials!');
    }
  },
);

export const listRawMaterialsSlice = createSlice({
  name: 'listRawMaterials',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleGetListRawMaterials.pending, (state) => {
        state.loading = true;
        state.listRawMaterials = null;
        state.error = null;
      })
      .addCase(handleGetListRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.listRawMaterials = action.payload;
        state.error = null;
      })
      .addCase(handleGetListRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.listRawMaterials = null;
        state.error = action.error.message;
      });
  },
});

export const listRawMaterialsActions = listRawMaterialsSlice.actions;

export default listRawMaterialsSlice.reducer;
