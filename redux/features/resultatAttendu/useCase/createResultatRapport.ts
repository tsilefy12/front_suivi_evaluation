import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ResultatRapportItem } from "../resultatRapport.interface";

export const createResultatAttendu = createAsyncThunk(
  "resultatAttandu/createResultatAttendu",
  async (resultatAttendu: ResultatRapportItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/resultat",
        resultatAttendu
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Résultat attendu créé avec succès",
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
