import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editMission = createAsyncThunk(
  "mission/editMission",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/mission/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
