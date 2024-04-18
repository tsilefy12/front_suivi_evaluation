import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getGrantEncours = createAsyncThunk(
  "grantEncours/getGrantEncours",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params =JSON.stringify(data.args)
      const response = await axios.get(`/compta/grant/${data.id}`, {params});
      console.log(" data :", response.data)
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
