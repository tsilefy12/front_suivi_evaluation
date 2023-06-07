import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getUsers = createAsyncThunk("employe/getUsers", async (data: any, thunkAPI) => {
  try {
    const params = {
      where: {
        employeeId: null
      }
    };
    const response = await axios.get("/auth/user", { params });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});