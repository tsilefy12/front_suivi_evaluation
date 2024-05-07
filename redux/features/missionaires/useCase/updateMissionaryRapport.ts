import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { MissionairesItem } from "../missionaires.interface";

export const updateMissionaryRapport = createAsyncThunk(
  "missionary/updateMissionary",
  async (data: { id: string; missionaires: MissionairesItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/suivi-evaluation/missionaire-rapport/${data.id}`,
        data.missionaires
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Missionnaire mis à jour avec succès",
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
