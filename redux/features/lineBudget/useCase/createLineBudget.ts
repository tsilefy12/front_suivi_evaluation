import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { LineBudgetItem } from "../lineBudget.interface";

export const createLineBudget = createAsyncThunk(

  "lineBudget/createLineBudget",
  async (lineBudget: LineBudgetItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/config-budget", lineBudget);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Line budget créer avec succès",
          options: { variant: "success" }
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
