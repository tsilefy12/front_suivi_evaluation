import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getPlanTravaillist = createAsyncThunk(
  "planTravail/getPlanTravaillist",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
