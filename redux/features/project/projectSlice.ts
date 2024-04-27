import { createSlice } from "@reduxjs/toolkit";
import { ProjectInitialState } from "./project.interface";
import { getProjectList } from "./useCase/getProjectList";
import { createProject } from "./useCase/createProject";
import { getProject } from "./useCase/getProject";
import { editProject } from "./useCase/editProject";
import { updateProject } from "./useCase/updateProject";
import { deleteProject } from "./useCase/deleteProject";

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
    // create project
    [createProject.pending.type]: (state) => {
      state.loading = true;
    },
    [createProject.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.projectList.push(action.payload);
    },
    [createProject.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // get status
    [getProject.pending.type]: (state) => {
      state.loading = true;
    },
    [getProject.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
    },
    [getProject.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
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

    // edit project 
    [editProject.pending.type]: (state) => {
      state.loading = true;
    },
    [editProject.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.project = action.payload;
      state.isEditing = true;
    },
    [editProject.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    //update project
    [updateProject.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.project = {};
      state.isEditing = false;
    },
    [updateProject.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // delete project
    [deleteProject.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteProject.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteProject.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

  }
});

export const { cancelEdit } = projectSlice.actions;
