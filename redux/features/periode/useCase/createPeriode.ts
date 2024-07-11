import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PeriodeItem } from "../periode.interface";

export const createPeriode = createAsyncThunk(
  "periode/createPeriode",
  async (periode: PeriodeItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/periode", periode);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Période créée avec succès",
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
