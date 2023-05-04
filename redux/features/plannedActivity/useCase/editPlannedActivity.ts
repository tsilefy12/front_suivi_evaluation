import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editPlannedActivity = createAsyncThunk(
  "plannedActivity/editPlannedActivity",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/planned-activity/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
