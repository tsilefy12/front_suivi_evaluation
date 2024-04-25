import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editType = createAsyncThunk(
  "type/editType",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/compta/type-budget/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
