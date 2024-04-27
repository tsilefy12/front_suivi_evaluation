import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editProject = createAsyncThunk(
  "project/editProject",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/compta/project/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
