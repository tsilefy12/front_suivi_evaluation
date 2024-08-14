import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { RapportTechniqueItem } from "../rapportTechnique.interface";

export const createRapportTechnique = createAsyncThunk(
  "rapportTechnique/createRapportTechnique",
  async (rapportTechnique: RapportTechniqueItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/rapport-technique",
         rapportTechnique
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport technique créé avec succès",
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
