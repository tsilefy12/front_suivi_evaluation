import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getTacheEtObjectifs = createAsyncThunk(
  "tacheEtObjectifs/getTacheEtObjectifs",
  async (data: { idT: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args)
      }
      const response = await axios.get(`/suivi-evaluation/tache-cle/${data.idT}`,{params});
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
