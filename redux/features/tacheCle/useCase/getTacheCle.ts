import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getTacheCle = createAsyncThunk(
  "tacheCle/getTacheCle",
  async (data: { idT: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/tache-cle/${data.idT}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
