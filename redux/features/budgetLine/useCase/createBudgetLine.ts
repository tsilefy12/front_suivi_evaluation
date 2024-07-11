import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BudgetLineItem } from "../budgetLine.interface";

export const createBudgetLine = createAsyncThunk(
  "budgetLine/createBudgetLine",
  async (budgetLine: BudgetLineItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/budget-line", budgetLine);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Ligne budgetaire créé avec succès",
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
