import { createSlice } from "@reduxjs/toolkit";
import { createMissionaryRapport } from "./useCase/createMissionaryRapport";
import { editMissionaryRapport } from "./useCase/editMissionaryRapport";
import { getMissionaryRapport } from "./useCase/getMissionaryRapport";
import { getMissionaryRapportList } from "./useCase/getMissionaryRapportList";
import { updateMissionaryRapport } from "./useCase/updateMissionaryRapport";
import { MissionaryRapportInitialState } from "./missionaryRapportSlice.interface";
import { deleteMissionaryRapport } from "./useCase/deleteMissionaryRapport";

const missionaryRapportInitialState: MissionaryRapportInitialState = {
  missionaryRapportList: [],
  missionaryRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionaryRapportSlice = createSlice({
  name: "missionary",
  initialState: missionaryRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionary = {};
    },
  },
  extraReducers: {
    [getMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionaryRapport.fulfilled.type]: (state, action) => {
      state.missionaryRapport = action.payload;
      state.loading = false;
    },
    [getMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMissionaryRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionaryRapportList.fulfilled.type]: (state, action) => {
      state.missionaryRapportList = action.payload;
      state.loading = false;
    },
    [getMissionaryRapportList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createMissionaryRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.missionaryRapportList.push(action.payload)
    },
    [createMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMissionaryRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.missionaryRapport = {};
    },
    [updateMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMissionaryRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editMissionaryRapport.fulfilled.type]: (state, action) => {
      state.missionaryRapport = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionaryRapportSlice.actions;
