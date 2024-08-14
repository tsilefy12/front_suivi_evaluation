import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { RapportFinanceItem } from "../rapportFinance.interface";

export const createRapportFinance = createAsyncThunk(
  "rapportFinance/createRapportFinance",
  async (rapportFinance: RapportFinanceItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/rapport-finance",
        rapportFinance
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport financier créé avec succès",
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
