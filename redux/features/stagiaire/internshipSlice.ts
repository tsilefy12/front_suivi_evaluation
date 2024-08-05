import { createSlice } from "@reduxjs/toolkit";
import { InternshipInitialState } from "./internshipSlice.interface";
import { getInterns } from "./useCase/getInterns";

const initialState: InternshipInitialState = {
  interns: [],
  intern: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const internSlice = createSlice({
  name: "intern",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.intern = {};
    },
  },
  extraReducers: {
    [getInterns.pending.type]: (state) => {
      state.loading = true;
    },
    [getInterns.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.interns = action.payload;
    },
    [getInterns.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = internSlice.actions;
