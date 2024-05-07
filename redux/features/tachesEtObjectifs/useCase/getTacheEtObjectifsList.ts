import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getTacheEtObjectifsList = createAsyncThunk(
  "tacheEtObjectifs/getTacheClelist",
  async (data: { args?: any }, thunkAPI) => {
    try {
      console.log(data.args)
      const params = {
        args: JSON.stringify(data.args)
      }
      const response = await axios.get("/suivi-evaluation/tache-cle", { params });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
