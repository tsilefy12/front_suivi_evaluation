import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BesoinvehiculeItem } from "../besoinVehicule.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateBesoinVehicule = createAsyncThunk(
  "besoinVehicule/updateBesoinVehicule",
  async (data: { id: string; besoinVehicule: BesoinvehiculeItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/besoin-en-vehicule/${data.id}`, data.besoinVehicule);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Besoin vehicule mise à jour avec succès",
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
