import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getBesoinVehicule = createAsyncThunk(
  "besoinVehicule/getBesoinVehicule",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/besoin-en-vehicule/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
