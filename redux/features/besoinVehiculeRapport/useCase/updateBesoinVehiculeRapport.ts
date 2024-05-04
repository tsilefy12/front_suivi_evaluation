import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { BesoinvehiculeRapportItem } from "../besoinVehiculeRapport.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateBesoinVehiculeRapport = createAsyncThunk(
  "besoinVehicule/updateBesoinVehiculeRapport",
  async (data: { id: string; besoinVehiculeRapport: BesoinvehiculeRapportItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/besoin-vehicule-rapport/${data.id}`, data.besoinVehiculeRapport);
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
