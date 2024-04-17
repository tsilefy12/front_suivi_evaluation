import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculCarburantItem } from "../calculCarburant.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateCalculCarburant = createAsyncThunk(
  "calculCarburant/updateCalculCarburant",
  async (data: { id: string; calculCarburant: CalculCarburantItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/calcul-carburant/${data.id}`, data.calculCarburant);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul carburant mise à jour avec succès",
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
