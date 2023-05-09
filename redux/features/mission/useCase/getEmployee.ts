import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (data: { employeeId?: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/rh/employee/${data.employeeId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
