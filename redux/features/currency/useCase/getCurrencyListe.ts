import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getCurrencyListe = createAsyncThunk(
  "currency/getCurrencyListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/compta/currency");
      // console.log("response", response);
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
