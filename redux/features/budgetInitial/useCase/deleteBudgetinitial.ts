import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteBudgetinitial = createAsyncThunk(
  "budgetinitial/deleteBudgetinitial",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Budget initial supprimé avec succès",
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
