import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deletePlannedActivity = createAsyncThunk(
  "plannedActivity/deletePlannedActivity",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/planned-activity/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Activite supprimé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
