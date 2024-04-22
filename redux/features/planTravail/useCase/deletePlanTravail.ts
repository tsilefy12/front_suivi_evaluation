import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deletePlanTravail = createAsyncThunk(
  "planTravail/deletePlanTravail",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/plan-travaile/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Plan de travail supprimé avec succès",
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
