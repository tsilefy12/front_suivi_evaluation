import { createSlice } from "@reduxjs/toolkit";
import { ProjectInitialState } from "./project.interface";
import { getProjectList } from "./useCase/getProjectList";

const projectInitialState: ProjectInitialState = {
  projectList: [],
  project: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState: projectInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.project = {};
    },
  },
  extraReducers: {
    // get project
    [getProjectList.pending.type]: (state) => {
      state.loading = true;
    },
    [getProjectList.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.projectList = action.payload;
    },
    [getProjectList.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = projectSlice.actions;
