import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CalculPileRapportItem } from "../calculPileRapport.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateCalculPileRapport = createAsyncThunk(
  "calculPile/updateCalculPileRapport",
  async (data: { id: string; calculPileRapport: CalculPileRapportItem
   }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/calcul-pile-rapport/${data.id}`, data.calculPileRapport);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Calcul de pile mise à jour avec succès",
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
