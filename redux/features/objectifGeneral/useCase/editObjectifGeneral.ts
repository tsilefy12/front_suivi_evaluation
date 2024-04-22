import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editObjectifGeneral = createAsyncThunk(
  "objectifGeneral/editObjectifGeneral",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/objectif-general/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
