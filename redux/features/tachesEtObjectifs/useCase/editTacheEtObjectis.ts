import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editTacheEtObjectifs = createAsyncThunk(
  "tacheEtObjectifs/editTacheEtObjectifs",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/tache-cle/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
