import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { TacheEtObjectifItem } from "../tacheETObjectifs.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateTacheEtObjectifs = createAsyncThunk(
  "tacheEtObjectifs/updateTacheCle",
  async (data: { id: string; tacheEtObjectifs: TacheEtObjectifItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/tache-cle/${data.id}`, data.tacheEtObjectifs);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mise à jour avec succès",
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
