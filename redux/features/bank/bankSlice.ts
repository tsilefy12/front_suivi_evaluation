import { createSlice } from "@reduxjs/toolkit";
import { BankInitialState } from "./bank.interface";
import { getBank } from "./getBank";

const bankInitialState: BankInitialState = {
  bankList: [],
  bank: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState: bankInitialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.bank = {};
    },
  },
  extraReducers: {
    // get autre info
    [getBank.pending.type]: (state) => {
      state.loading = true;
    },
    [getBank.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.bankList = action.payload;
    },
    [getBank.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
}
});

export const { cancelEdit } = bankSlice.actions;
