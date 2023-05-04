import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
// import { axios } from "../../../../lib/axios";

export const getDeliverable = createAsyncThunk(
  "deliverable/getDeliverable",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/deliverable/${data.id}`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
