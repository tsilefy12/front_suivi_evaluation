import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getEmployeeBM = createAsyncThunk(
  "employee/getEmployeeBM",
  async (data: { employeeBMId?: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/rh/employee/${data.employeeBMId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
