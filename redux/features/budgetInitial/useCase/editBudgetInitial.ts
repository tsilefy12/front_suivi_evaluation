import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

export const editBudgetInitial = createAsyncThunk(
  "budgetInitial/editBudgetInitial",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/suivi-evaluation/budget-initial/${data.id}`
      );
      console.log("edit data :", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Extraire les informations pertinentes de l'objet d'erreur
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
