import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

/**
 * @param data : { id: string } : the id of the consumable to get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one consumable
 */
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
