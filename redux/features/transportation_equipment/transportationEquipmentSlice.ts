import { TransportationEquipmentInitialState } from "./transportationEquipment.interface";
import { createSlice } from "@reduxjs/toolkit";
import { getTransportationEquipments } from "./useCases/TransportationEquipments";

const transportationEquipmentInitialState: TransportationEquipmentInitialState =
  {
    transportationEquipments: [],
    transportationEquipment: {},
    isEditing: false,
    loading: false,
    error: null,
  };

export const transportationEquipmentSlice = createSlice({
  name: "transportation_equipment",
  initialState: transportationEquipmentInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.transportationEquipment = {};
    },
  },
  extraReducers: {
    // get transportation Equipments
    [getTransportationEquipments.pending.type]: (state) => {
      state.loading = true;
    },
    [getTransportationEquipments.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.transportationEquipments = action.payload;
    },
    [getTransportationEquipments.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = transportationEquipmentSlice.actions;
