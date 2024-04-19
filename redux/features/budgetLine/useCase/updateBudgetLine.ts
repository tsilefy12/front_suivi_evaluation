import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BudgetLineItem } from "../budgetLine.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateBudgetLine = createAsyncThunk(
  "budgetLine/updateBudgetLine",
  async (data: { id: string; budgetLine: BudgetLineItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/campta/budget-line/${data.id}`, data.budgetLine);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Ligne budgetaire mise à jour avec succès",
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
