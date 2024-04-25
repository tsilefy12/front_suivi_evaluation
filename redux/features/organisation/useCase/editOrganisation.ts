import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editOrganisation = createAsyncThunk(
  "organisation/editOrganisation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/compta/organisation/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
