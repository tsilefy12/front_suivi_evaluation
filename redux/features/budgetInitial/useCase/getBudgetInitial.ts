import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const getBudgetInitial = createAsyncThunk(
  "budgetInitial/getBudgetInitial",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(
        `/suivi-evaluation/budget-initial/${data.id}`,
        { params }
      );
      console.log("edit budget initial", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
