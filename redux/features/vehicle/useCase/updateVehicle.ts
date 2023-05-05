import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { VehicleItem } from "../vehicleSlice.interface";
import { axios } from "../../../../axios";

export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async (data: { id: string; vehicle: VehicleItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/vehicle/${data.id}`, data.vehicle);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Vehicule mis à jour avec succès",
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
