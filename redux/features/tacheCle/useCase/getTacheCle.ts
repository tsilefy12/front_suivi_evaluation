import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getTacheCle = createAsyncThunk(
  "tacheCle/getTacheCle",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
