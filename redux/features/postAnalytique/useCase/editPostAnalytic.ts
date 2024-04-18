import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editPostAnalytic = createAsyncThunk(
  "postAnalytic/editPostAnalytic",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/compta/post-analytic/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
