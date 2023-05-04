import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { PlannedActivityItem } from "../plannedActivitySlice.interface";
import { axios } from "../../../../axios";

export const updatePlannedActivity = createAsyncThunk(
  "plannedActivity/updatePlannedActivity",
  async (
    data: { id: string; plannedActivity: PlannedActivityItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/planned-activity/${data.id}`,
        data.plannedActivity
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Activite mis à jour avec succès",
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
