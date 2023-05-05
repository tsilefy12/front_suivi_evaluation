import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

/**
 * @param data : { args?: any } : PRISMA arguments to filter programs
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to get employees data
 */
export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/rh/employee", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
