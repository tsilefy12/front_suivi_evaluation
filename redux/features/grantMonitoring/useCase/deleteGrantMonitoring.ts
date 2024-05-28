import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteGrantMonitoring = createAsyncThunk(
  "grantMonitoring/deleteGrantMonitoring",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/suivi-evaluation/grant-monitoring/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Grant monitoring supprimé avec succès",
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
