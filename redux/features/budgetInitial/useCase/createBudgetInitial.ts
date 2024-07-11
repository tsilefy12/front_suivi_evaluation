import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BudgetInitialItem } from "../budgetInitial.interface";

export const createBudgetInitial = createAsyncThunk(
  "budgetInitial/createBudgetInitial",
  async (budgetInitial: BudgetInitialItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/budget-initial",
        budgetInitial
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Budget initial créé avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
