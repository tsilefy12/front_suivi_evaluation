import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editReliquatGrant = createAsyncThunk(
  "reliquatGrant/editReliquatGrant",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
