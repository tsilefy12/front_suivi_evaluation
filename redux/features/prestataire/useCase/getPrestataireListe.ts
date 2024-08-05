import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getPrestataireListe = createAsyncThunk(
  "prestataire/getPrestataireListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/prestataire", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
