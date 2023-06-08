import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getEmployeUser = createAsyncThunk("employe/getEmployeUser", async (data: { employeId: string }, thunkAPI) => {
  try {
    const args = {
      where: {
        employeeId: data.employeId,
      }
    }
    const response = await axios.get(`/auth/user`, {
      params: {
        args: JSON.stringify(args)
      }
    });
    if (response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});