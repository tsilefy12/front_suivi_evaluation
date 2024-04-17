import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteBesoinVehicule = createAsyncThunk(
  "besoinVehicule/deleteBesoinVehicule",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/besoin-en-vehicule/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Besoin vehicule supprimé avec succès",
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
