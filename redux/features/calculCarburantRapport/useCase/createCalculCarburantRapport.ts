import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculCarburantRapportItem } from "../calculCarburantRapport.interface";

export const createCalculCarburantRapport = createAsyncThunk(
  "calculCarburant/createCalculCarburantRapport",
  async (calculCarburantRapport: CalculCarburantRapportItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/calcul-carburant-rapport",
        calculCarburantRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul carburant créé avec succès",
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
