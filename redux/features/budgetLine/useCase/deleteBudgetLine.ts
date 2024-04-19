import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteBudgetLine = createAsyncThunk(
  "budgetLine/deleteBudgetLine",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/budget-line/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Ligne budgetaire supprimé avec succès",
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
