import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getProgrammeRapport = createAsyncThunk(
  "programmeRapport/getProgrammeRapport",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args)
      const response = await axios.get(`/suivi-evaluation/programme-rapport/${data.id}`, {params});
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
