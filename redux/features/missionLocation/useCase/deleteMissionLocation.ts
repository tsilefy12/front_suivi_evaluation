import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteMissionLocation = createAsyncThunk(
  "missionLocation/deleteMissionLocation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/mission-location/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu supprimé avec succès",
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
