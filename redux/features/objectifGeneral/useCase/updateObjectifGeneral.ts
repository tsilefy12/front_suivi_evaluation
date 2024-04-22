import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ObjectifGeneralItem } from "../objectifGeneral.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateObjectifGeneral = createAsyncThunk(
  "objectifGeneral/updateObjectifGeneral",
  async (data: { id: string; objectifGeneral: ObjectifGeneralItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/objectif-general/${data.id}`, data.objectifGeneral);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif général mise à jour avec succès",
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
