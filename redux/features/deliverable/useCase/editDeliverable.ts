import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
// import { axios } from "../../../../lib/axios";

export const editDeliverable = createAsyncThunk(
  "deliverable/editDeliverable",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/deliverable/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
