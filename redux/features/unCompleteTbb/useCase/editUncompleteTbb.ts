import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editUncompleteTbb = createAsyncThunk(
  "mission/editUncompleteTbb",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `suivi-evaluation/uncomplete-tbb/${data.id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
