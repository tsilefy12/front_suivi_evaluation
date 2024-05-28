import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { GrantMonitoringItem } from "../grantMonitoring.interface";

export const createGrantMonitoring = createAsyncThunk(
  "grantMonitoring/createGrantMonitoring",
  async (grantMonitoring: GrantMonitoringItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/grant-monitoring",
        grantMonitoring
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Grant monitoring created successfully",
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
