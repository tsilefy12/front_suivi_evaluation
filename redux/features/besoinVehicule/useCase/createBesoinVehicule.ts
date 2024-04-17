import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BesoinvehiculeItem } from "../besoinVehicule.interface";


export const createBesoinVehicule = createAsyncThunk(
  "besoinVehicule/createBesoinVehicule",
  async (besoinVehicule: BesoinvehiculeItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/besoin-en-vehicule", besoinVehicule);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Besoin vehicule created successfully",
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
