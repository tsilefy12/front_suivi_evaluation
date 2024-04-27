import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ResultatRapportItem } from "../resultatRapport.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateResultRapport = createAsyncThunk(
  "resultatAttendu/updateResultRapport",
  async (data: { id: string; resultatAttendu: ResultatRapportItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/resultat/${data.id}`, data.resultatAttendu);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Résultat attendu mise à jour avec succès",
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
