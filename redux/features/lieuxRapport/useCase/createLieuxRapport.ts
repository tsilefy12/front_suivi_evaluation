import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { LieuxRapportItem } from "../lieuxRapport.interface";

export const createLieuxRapport = createAsyncThunk(
  "lieux/createLieuxRapport",
  async (data: {lieuxRapport:LieuxRapportItem}, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/lieux-rapport", data.lieuxRapport);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu de rapport créé avec succès",
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
