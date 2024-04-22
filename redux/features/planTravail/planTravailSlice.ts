import { createSlice } from "@reduxjs/toolkit";
import { PlanTravailInitialState } from "./planTravail.interface";
import { getPlanTravail } from "./useCase/getPlanTravail";
import { getPlanTravaillist } from "./useCase/getPlanTravaillist";
import { createPlanTravail } from "./useCase/createPlanTravail";
import { editPlanTravail } from "./useCase/editPlanTravail";
import { updatePlanTravail } from "./useCase/updatePlanTravail";
import { deletePlanTravail } from "./useCase/deletePlanTravail";

const planTravailInitialState: PlanTravailInitialState = {
  planTravaillist: [],
  planTravail: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const planTravailSlice = createSlice({
  name: "planTravail",
  initialState: planTravailInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.planTravail = {};
    },
  },
  extraReducers: {
    // get tache clé
    [getPlanTravail.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlanTravail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.planTravail = action.payload;
    },
    [getPlanTravail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get tache clé
    [getPlanTravaillist.pending.type]: (state) => {
      state.loading = true;
    },
    [getPlanTravaillist.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.planTravaillist = action.payload;
    },
    [getPlanTravaillist.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create tache clé
    [createPlanTravail.pending.type]: (state) => {
      state.loading = true;
    },
    [createPlanTravail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.planTravaillist.push(action.payload);
    },
    [createPlanTravail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // edit tache clé 
    [editPlanTravail.pending.type]: (state) => {
      state.loading = true;
    },
    [editPlanTravail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.planTravail = action.payload;
      state.isEditing = true;
    },
    [editPlanTravail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update tache clé 
    [updatePlanTravail.pending.type]: (state) => {
      state.loading = true;
    },
    [updatePlanTravail.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.planTravail = {};
      state.isEditing = false;
    },
    [updatePlanTravail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete tache clé
    [deletePlanTravail.pending.type]: (state) => {
      state.loading = true;
    },
    [deletePlanTravail.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deletePlanTravail.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = planTravailSlice.actions;
