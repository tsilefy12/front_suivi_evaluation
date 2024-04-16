import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { MissionaryItem } from "../missionarySlice.interface";

export const createMissionary = createAsyncThunk(
  "missionary/createMissionary",
  async (data: MissionaryItem, thunkAPI) => {
    try {
      const response = await axios.post("/missionary", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Missionnaire créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
