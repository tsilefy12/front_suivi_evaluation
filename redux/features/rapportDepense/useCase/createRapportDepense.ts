import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { RapportDepenseItem } from "../rapportDepense.interface";

export const createRapportDepense = createAsyncThunk(
  "rapportDepense/createRapportDepense",
  async (rapportDepense: RapportDepenseItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/rapport-depense",
        rapportDepense
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport de depense créé avec succès",
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
