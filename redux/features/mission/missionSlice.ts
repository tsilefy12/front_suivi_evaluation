import { createSlice } from "@reduxjs/toolkit";
import { createMission } from "./useCase/createMission";
import { deleteMission } from "./useCase/deleteMission";
import { getMission } from "./useCase/getMission";
import { getMissionListe } from "./useCase/getMissionListe";
import { updateMission } from "./useCase/updateMission";
import { MissionInitialState } from "./mission.interface";
import { editMission } from "./useCase/editMission";
import { getEmployees } from "./useCase/getEmployees";
import { getEmployeesMM } from "./useCase/getEmployeesMM";
import { getEmployeesBM } from "./useCase/getEmployeesBM";
// import { getMissionCopie } from "./useCase/getMissionGoal";
// import { getMissionCopieList } from "./useCase/getMissionGoalListe";

const missionInitialState: MissionInitialState = {
  missionListe: [],
  mission: {},
  employeeList: [],
  isEditing: false,
  loading: false,
  error: null,
};

export const missionSlice = createSlice({
  name: "mission",
  initialState: missionInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.mission = {};
    },
  },
  extraReducers: {
    // get Mission
    [getMission.pending.type]: (state) => {
      state.loading = true;
    },
    [getMission.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.mission = action.payload;
    },
    [getMission.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get Missions
    [getMissionListe.pending.type]: (state) => {
      state.loading = true;
    },
    [getMissionListe.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.missionListe = action.payload;
    },
    [getMissionListe.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create mission
    [createMission.pending.type]: (state) => {
      state.loading = true;
    },
    [createMission.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.missionListe.push(action.payload);
    },
    [createMission.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit mission
    [editMission.pending.type]: (state) => {
      state.loading = true;
    },
    [editMission.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.mission = action.payload;
      state.isEditing = true;
    },
    [editMission.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update mission
    [updateMission.pending.type]: (state) => {
      state.loading = true;
    },
    [updateMission.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.mission = {};
      state.isEditing = false;
    },
    [updateMission.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete mission
    [deleteMission.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMission.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteMission.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get employees
    [getEmployees.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    },
    [getEmployees.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // get employees MM
    [getEmployeesMM.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployeesMM.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    },
    [getEmployeesMM.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get employees BM
    [getEmployeesBM.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployeesBM.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    },
    [getEmployeesBM.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // [getMissionCopie.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [getMissionCopie.fulfilled.type]: (state, action) => {
    //   state.mission = action.payload;
    //   state.loading = false;
    // },
    // [getMissionCopie.rejected.type]: (state, action) => {
    //   state.error = action.error;
    //   state.loading = false;
    // },

    // [getMissionCopieList.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [getMissionCopieList.fulfilled.type]: (state, action) => {
    //   state.missionListe = action.payload;
    //   state.loading = false;
    // },
    // [getMissionCopieList.rejected.type]: (state, action) => {
    //   state.error = action.error;
    //   state.loading = false;
    // },
  },
});

export const { cancelEdit } = missionSlice.actions;
