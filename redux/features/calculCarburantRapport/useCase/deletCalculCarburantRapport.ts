import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteCalculCarburantRapport = createAsyncThunk(
  "calculCarburant/deleteCalculCarburantRapport",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/calcul-carburant-rapport/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul carburant supprimé avec succès",
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
