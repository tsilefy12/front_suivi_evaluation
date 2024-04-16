import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getMissionaryList = createAsyncThunk(
  "missionary/getMissionaryList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const response = await axios.get("/missionary");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
