import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getMissionaryRapportList = createAsyncThunk(
  "missionary/getMissionaryList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const response = await axios.get("/suivi-evaluation/missionaire-rapport");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
