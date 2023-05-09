import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getEmployeeMM = createAsyncThunk(
  "employee/getEmployeeMM",
  async (data: { employeeMMId?: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/rh/employee/${data.employeeMMId}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
