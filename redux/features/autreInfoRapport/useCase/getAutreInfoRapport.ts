import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getAutreInfoRapport = createAsyncThunk(
  "autreInfoRapport/getAutreInfoRapport",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/autre-info-rapport/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
