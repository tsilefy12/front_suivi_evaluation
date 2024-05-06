import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editTacheEtObjectifs = createAsyncThunk(
  "tacheEtObjectifs/editTacheEtObjectifs",
  async (data: { id: string , args?: any }, thunkAPI) => {
      try {
        
          const params = {
            args: JSON.stringify(data.args),
          };

          const response = await axios.get(`/suivi-evaluation/tache-cle/${data.id}`, { params });
          return response.data;
      } catch (error: any) {
          if (error.response) {
          return thunkAPI.rejectWithValue(error);
          }
          throw error;
      }
  }
);
