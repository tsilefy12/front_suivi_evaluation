import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editMissionLocation = createAsyncThunk(
  "missionLocation/editMissionLocation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/mission-location/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
