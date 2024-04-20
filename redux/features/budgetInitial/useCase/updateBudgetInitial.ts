import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BudgetInitialItem } from "../budgetInitial.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateBudgetInitial = createAsyncThunk(
  "budgetInitial/updateBudgetInitial",
  async (data: { id: string; budgetInitial: BudgetInitialItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/budget-initial/${data.id}`, data.budgetInitial);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Budget initial mise à jour avec succès",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
