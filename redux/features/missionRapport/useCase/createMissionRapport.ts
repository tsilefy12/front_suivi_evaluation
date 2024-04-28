import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { MissionRapportItem } from "../missionRapport.interface";

export const createMissionRapport = createAsyncThunk(
  "missionRapport/createMissionRapport",
  async (data:{ missionRapport : MissionRapportItem }, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/mission-rapport", data.missionRapport);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport de mission créé avec succès",
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
