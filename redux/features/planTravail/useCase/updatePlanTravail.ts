import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PlanTravailItem } from "../planTravail.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updatePlanTravail = createAsyncThunk(
  "planTravail/updatePlanTravail",
  async (data: { id: string; planTravail: PlanTravailItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`${data.id}`, data.planTravail);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Plan de travail mise à jour avec succès",
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
