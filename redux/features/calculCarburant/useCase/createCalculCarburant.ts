import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculCarburantItem } from "../calculCarburant.interface";

export const createCalculCarburant = createAsyncThunk(
  "calculCarburant/createCalculCarburantt",
  async (calculCarburant: CalculCarburantItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/calcul-carburant",
        calculCarburant
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
