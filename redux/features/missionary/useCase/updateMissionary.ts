import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { MissionaryItem } from "../missionarySlice.interface";

export const updateMissionary = createAsyncThunk(
  "missionary/updateMissionary",
  async (data: { id: string; missionary: MissionaryItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/missionary/${data.id}`,
        data.missionary
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Missionnaire mis à jour avec succès",
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
