import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { MissionLocationItem } from "../missionLocationSlice.interface";
import { axios } from "../../../../axios";

export const updateMissionLocation = createAsyncThunk(
  "missionLocation/updateMissionLocation",
  async (
    data: { id: string; missionLocation: MissionLocationItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/mission-location/${data.id}`,
        data.missionLocation
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu mis à jour avec succès",
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
