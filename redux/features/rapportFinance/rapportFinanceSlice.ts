import { createSlice } from "@reduxjs/toolkit";
import { RapportFinanceInitialState } from "./rapportFinance.interface";
import { createRapportFinance } from "./useCase/createRapportFinance";

const rapportFinanceInitialState: RapportFinanceInitialState = {
  rapportFinanceList: [],
  rapportFinance: {},
  isEditing: false,
  loading: false,
};

export const rapportFinanceSlice = createSlice({
  name: "rapportFinance",
  initialState: rapportFinanceInitialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.rapportFinance = {};
      },
    },
    extraReducers: {
    //   // get rapport finance
    //   [getRapportFinance.pending.type]: (state) => {
    //     state.loading = true;                
    //   },
    //   [getRapportFinance.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.rapportFinance = action.payload;
    //   },
    //   [getRapportFinance.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
    //   // get rapport finance list
    //   [getRapportFinanceList.pending.type]: (state) => {
    //     state.loading = true;
    //   },
    //   [getRapportFinanceList.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.rapportFinanceList = action.payload;
    //   },
    //   [getRapportFinanceList.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
    //   // create rapport finance
    //   [createRapportFinance.pending.type]: (state) => {
    //     state.loading = true;
    //   },
      [createRapportFinance.fulfilled.type]: (state, action) => {
        state.loading = false;
        state.rapportFinanceList.push(action.payload);
      },
      [createRapportFinance.rejected.type]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
  }});