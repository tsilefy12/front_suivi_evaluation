import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { VehicleItem } from "../vehicleSlice.interface";

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (data: VehicleItem, thunkAPI) => {
    try {
      const response = await axios.post("/vehicle", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Vehicule créé avec succès",
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
