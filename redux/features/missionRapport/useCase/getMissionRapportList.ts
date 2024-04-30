import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getMissionRapportList = createAsyncThunk(
  "missionRapport/getMissionRapportList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/suivi-evaluation/mission-rapport", { params });
      console.log("data :", response.data)
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return  thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
