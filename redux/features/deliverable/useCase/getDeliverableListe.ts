import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
// import { axios } from "../../../../lib/axios";

export const getDeliverableList = createAsyncThunk(
  "deliverable/getDeliverableList",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/deliverable");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
