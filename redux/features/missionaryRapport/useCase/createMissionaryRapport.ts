import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { MissionaryRapportItem } from "../missionaryRapportSlice.interface";

export const createMissionaryRapport = createAsyncThunk(
  "missionary/createMissionaryRapport",
  async (data: MissionaryRapportItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/missionaire-rapport", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Missionnaire créé avec succès",
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
