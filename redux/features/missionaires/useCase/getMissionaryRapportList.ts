import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getMissionaryRapportList = createAsyncThunk(
  "missionary/getMissionaryRapportList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args)
      const response = await axios.get("/suivi-evaluation/missionaire-rapport", {params});
      // console.log(response.data)
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
