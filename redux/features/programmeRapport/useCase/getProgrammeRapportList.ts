import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getProgrammeRapportList = createAsyncThunk(
  "programmeRapport/getProgrammeRapportList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/suivi-evaluation/programme-rapport", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
