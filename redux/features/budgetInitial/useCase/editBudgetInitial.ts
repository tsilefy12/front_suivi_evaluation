import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editBudgetInitial = createAsyncThunk(
  "budgetInitial/editBudgetInitial",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/suivi-evaluation/budget-initial/${data.id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const serializedError = {
          message: error.message,
          status: error.response.status,
          data: error.response.data,
        };
        return thunkAPI.rejectWithValue(serializedError);
      }
      throw error;
    }
  }
);
