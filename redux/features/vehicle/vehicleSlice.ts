import { createSlice } from "@reduxjs/toolkit";
import { createVehicle } from "./useCase/createVehicle";
import { editVehicle } from "./useCase/editVehicle";
import { getVehicle } from "./useCase/getVehicle";
import { getVehicleList } from "./useCase/getVehicleListe";
import { updateVehicle } from "./useCase/updateVehicle";
import { VehicleInitialState } from "./vehicleSlice.interface";
import { deleteVehicle } from "./useCase/deleteVehicle";

const initialState: VehicleInitialState = {
  vehicleList: [],
  vehicle: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.vehicle = {};
    },
  },
  extraReducers: {
    [getVehicle.pending.type]: (state) => {
      state.loading = true;
    },
    [getVehicle.fulfilled.type]: (state, action) => {
      state.vehicle = action.payload;
      state.loading = false;
    },
    [getVehicle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getVehicleList.pending.type]: (state) => {
      state.loading = true;
    },
    [getVehicleList.fulfilled.type]: (state, action) => {
      state.vehicleList = action.payload;
      state.loading = false;
    },
    [getVehicleList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createVehicle.pending.type]: (state) => {
      state.loading = true;
    },
    [createVehicle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.vehicleList.push(action.payload);
    },
    [createVehicle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateVehicle.pending.type]: (state) => {
      state.loading = true;
    },
    [updateVehicle.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.vehicle = {};
    },
    [updateVehicle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteVehicle.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteVehicle.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteVehicle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editVehicle.pending.type]: (state) => {
      state.loading = true;
    },
    [editVehicle.fulfilled.type]: (state, action) => {
      state.vehicle = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editVehicle.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = vehicleSlice.actions;
