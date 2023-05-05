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
