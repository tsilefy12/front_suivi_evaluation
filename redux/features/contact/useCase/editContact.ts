import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editContact = createAsyncThunk(
  "contact/editContact",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/contact/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
