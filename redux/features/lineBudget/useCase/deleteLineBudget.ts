import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteLineBudget = createAsyncThunk(
  "lineBudget/deleteLineBudget",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/config-budget/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Line budget supprimé avec succès",
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
