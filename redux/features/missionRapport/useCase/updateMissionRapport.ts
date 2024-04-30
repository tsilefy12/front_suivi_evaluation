import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { MissionRapportItem } from "../missionRapport.interface";
import { axios } from "../../../../axios";

export const updateMissionRapport = createAsyncThunk(
  "missionRapport/updateMissionRapport",
  async (data: { id: string; missionRapport: MissionRapportItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/suivi-evaluation/mission-rapport/${data.id}`,
        data.missionRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport de mission mis à jour avec succès",
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
