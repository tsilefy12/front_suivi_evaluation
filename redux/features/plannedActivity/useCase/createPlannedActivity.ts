import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PlannedActivityItem } from "../plannedActivitySlice.interface";

export const createPlannedActivity = createAsyncThunk(
  "plannedActivity/createPlannedActivity",
  async (data: PlannedActivityItem, thunkAPI) => {
    try {
      const response = await axios.post("/planned-activity", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Activite créé avec succès",
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
