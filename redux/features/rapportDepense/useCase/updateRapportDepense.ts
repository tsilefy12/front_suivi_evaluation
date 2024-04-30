import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { RapportDepenseItem } from "../rapportDepense.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateRapportDepense = createAsyncThunk(
  "rapportDepense/updateRapportDepense",
  async (data: { id: string; rapportDepense: RapportDepenseItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/rapport-depense/${data.id}`, data.rapportDepense);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Rapport de depense mise à jour avec succès",
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
