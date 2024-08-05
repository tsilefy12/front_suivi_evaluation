import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getInterns = createAsyncThunk(
  "interns/getInterns",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/intern", { params });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
