import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editRapportDepense = createAsyncThunk(
  "rapport/editRapportDepense",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/rapport-depense/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
