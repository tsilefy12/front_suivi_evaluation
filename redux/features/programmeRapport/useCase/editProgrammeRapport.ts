import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editProgrammeRapport = createAsyncThunk(
  "programmeRapport/editProgrammeRapport",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/suivi-evaluation/programme-rapport/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
