import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editVehicle = createAsyncThunk(
  "vehicle/editVehicle",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/vehicle/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
