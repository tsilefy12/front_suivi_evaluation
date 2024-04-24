import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ReliquatGrantsItem } from "../reliquatGrants.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateReliquatGrant = createAsyncThunk(
  "reliquatGrant/updateReliquatGrant",
  async (data: { id: string; reliquatGrant: ReliquatGrantsItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/reliquat-grant/${data.id}`, data.reliquatGrant);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Reliquate grant mise à jour avec succès",
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
