import { createSlice } from "@reduxjs/toolkit";
import { createMissionLocation } from "./useCase/createMissionLocation";
import { editMissionLocation } from "./useCase/editMissionLocation";
import { getMissionLocation } from "./useCase/getMissionLocation";
import { getMissionLocationList } from "./useCase/getMissionLocationListe";
import { updateMissionLocation } from "./useCase/updateMissionLocation";
import { MissionLocationInitialState } from "./missionLocationSlice.interface";
import { deleteMissionLocation } from "./useCase/deleteMissionLocation";

const initialState: MissionLocationInitialState = {
  missionLocationList: [],
  missionLocation: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionLocationSlice = createSlice({
  name: "missionLocation",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionLocation = {};
    },
  },
  extraReducers: {
    [getMissionLocation.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionLocation.fulfilled.type]: (state, action) => {
      state.missionLocation = action.payload;
      state.loading = false;
    },
    [getMissionLocation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMissionLocationList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionLocationList.fulfilled.type]: (state, action) => {
      state.missionLocationList = action.payload;
      state.loading = false;
    },
    [getMissionLocationList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMissionLocation.pending.type]: (state) => {
      state.loading = true;
    },
    [createMissionLocation.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createMissionLocation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMissionLocation.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMissionLocation.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.missionLocation = {};
    },
    [updateMissionLocation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMissionLocation.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMissionLocation.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMissionLocation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMissionLocation.pending.type]: (state) => {
      state.loading = true;
    },
    [editMissionLocation.fulfilled.type]: (state, action) => {
      state.missionLocation = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionLocation.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionLocationSlice.actions;
