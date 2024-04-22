import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PlanTravailItem } from "../planTravail.interface";

export const createPlanTravail = createAsyncThunk(
  "planTravail/createPlanTravail",
  async (planTravail: PlanTravailItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/plan-travaile", planTravail);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Plan de travail crée avec succès",
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
