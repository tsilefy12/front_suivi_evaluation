import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editBudgetLine = createAsyncThunk(
  "budgetLine/editBudgetLine",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/compta/budget-line/${data.id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
