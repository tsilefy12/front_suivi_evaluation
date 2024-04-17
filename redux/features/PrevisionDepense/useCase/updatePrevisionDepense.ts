import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PrevisionDepenseItem } from "../previsionDepense.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updatePrevisionDepense = createAsyncThunk(
  "previsionDepense/updatePrevisionDepense",
  async (data: { id: string; previsionDepense: PrevisionDepenseItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/prevision-depense/${data.id}`, data.previsionDepense);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Prévision de depense mise à jour avec succès",
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
