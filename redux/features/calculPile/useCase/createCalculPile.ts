import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculPileItem } from "../calculPile.interface";

export const createCalculePile = createAsyncThunk(
  "calculPile/createCalculePile",
  async (calculPile: CalculPileItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/calcul-pile", calculPile);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul de pile created successfully",
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
