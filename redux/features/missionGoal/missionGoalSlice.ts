import { createSlice } from "@reduxjs/toolkit";
import { createMissionGoal } from "./useCase/createMissionGoal";
// import { deleteFournisseur } from "./useCase/deleteMissionGoal";
import { editMissionGoal } from "./useCase/editMissionGoal";
import { getMissionGoal } from "./useCase/getMissionGoal";
import { getMissionGoalList } from "./useCase/getMissionGoalListe";
import { updateMissionGoal } from "./useCase/updateMissionGoal";
import { MissionGoalInitialState } from "./missionGoalSlice.interface";
import { deleteMission } from "../mission/useCase/deleteMission";
import { deleteMissionGoal } from "./useCase/deleteMissionGoal";

const initialState: MissionGoalInitialState = {
  missionGoalList: [],
  missionGoal: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const missionGoalSlice = createSlice({
  name: "missionGoal",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.missionGoal = {};
    },
  },
  extraReducers: {
    [getMissionGoal.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionGoal.fulfilled.type]: (state, action) => {
      state.missionGoal = action.payload;
      state.loading = false;
    },
    [getMissionGoal.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getMissionGoalList.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionGoalList.fulfilled.type]: (state, action) => {
      state.missionGoalList = action.payload;
      state.loading = false;
    },
    [getMissionGoalList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createMissionGoal.pending.type]: (state) => {
      state.loading = true;
    },
    [createMissionGoal.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createMissionGoal.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateMissionGoal.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMissionGoal.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.missionGoal = {};
    },
    [updateMissionGoal.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteMissionGoal.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMissionGoal.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMissionGoal.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editMissionGoal.pending.type]: (state) => {
      state.loading = true;
    },
    [editMissionGoal.fulfilled.type]: (state, action) => {
      state.missionGoal = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editMissionGoal.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = missionGoalSlice.actions;
