import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculPileRapportItem } from "../calculPileRapport.interface";

export const createCalculePileRapport = createAsyncThunk(
  "calculPile/createCalculePileRapport",
  async (calculPileRapport: CalculPileRapportItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/calcul-pile-rapport", calculPileRapport);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul de pile dans le rapport créé avec succès",
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
