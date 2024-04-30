import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getRapportDepenseList = createAsyncThunk(
  "rapportDepense/getRapportDepenseList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/suivi-evaluation/rapport-depense", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
