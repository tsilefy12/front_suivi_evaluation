import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/vehicle/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Vehicule supprimé avec succès",
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
