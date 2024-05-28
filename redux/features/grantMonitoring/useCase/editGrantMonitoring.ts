import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editGrantMonitoring = createAsyncThunk(
  "grantMonitoring/editGrantMonitoring",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/suivi-evaluation/grant-monitoring/${data.id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
