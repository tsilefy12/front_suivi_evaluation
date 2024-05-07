import { createSlice } from "@reduxjs/toolkit";
import { createMissionaryRapport } from "./useCase/createMissionaryRapport";
import { editMissionaryRapport } from "./useCase/editMissionaryRapport";
import { getMissionaryRapport } from "./useCase/getMissionaryRapport";
import { getMissionaryRapportList } from "./useCase/getMissionaryRapportList";
import { updateMissionaryRapport } from "./useCase/updateMissionaryRapport";
import { MissionairesInitialState } from "./missionaires.interface";
import { deleteMissionaryRapport } from "./useCase/deleteMissionaryRapport";

const missionairesInitialState: MissionairesInitialState = {
  missionaireslist: [],
  missionaires: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionairesSlice = createSlice({
  name: "missionaires",
  initialState: missionairesInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionaires = {};
    },
  },
  extraReducers: {
    [getMissionaryRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionaryRapport.fulfilled.type]: (state, action) => {
      state.missionaires = action.payload;
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
      state.missionaireslist = action.payload;
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
      state.missionaireslist.push(action.payload)
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
      state.missionaires = {};
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
      state.missionaires = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionaryRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionairesSlice.actions;
