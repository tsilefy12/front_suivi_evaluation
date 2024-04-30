import { createSlice } from "@reduxjs/toolkit";
import { createMissionRapport } from "./useCase/createMissionRapport";
import { getMissionRapport } from "./useCase/getMissionRapport";
import { getMissionRapportList } from "./useCase/getMissionRapportList";
import { updateMissionRapport } from "./useCase/updateMissionRapport";
import { MissionRapportInitialState } from "./missionRapport.interface";
import { deleteMissionRapport } from "./useCase/deleteMissionRapport";
import { editMissionRapport } from "./useCase/editMissionRapport";

const missionRapportInitialState: MissionRapportInitialState = {
  missionRapportList: [],
  missionRapport: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionRapportSlice = createSlice({
  name: "missionRapport",
  initialState: missionRapportInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionRapport = {};
    },
  },
  extraReducers: {
    [getMissionRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionRapport.fulfilled.type]: (state, action) => {
      state.missionRapport = action.payload;
      state.loading = false;
    },
    [getMissionRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMissionRapportList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionRapportList.fulfilled.type]: (state, action) => {
      state.missionRapportList = action.payload;
      state.loading = false;
    },
    [getMissionRapportList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMissionRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [createMissionRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.missionRapportList.push(action.payload);    
    },
    [createMissionRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMissionRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMissionRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.missionRapport = {};
    },
    [updateMissionRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMissionRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMissionRapport.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMissionRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMissionRapport.pending.type]: (state) => {
      state.loading = true;
    },
    [editMissionRapport.fulfilled.type]: (state, action) => {
      state.missionRapport = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionRapport.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionRapportSlice.actions;
