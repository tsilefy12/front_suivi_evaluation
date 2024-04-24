import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { GrantEncoursItem } from "../grantEncours.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateGrantEncours = createAsyncThunk(
  "grantEncours/updateGrantEncours",
  async (data: { id: string; grantEncour: GrantEncoursItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/compta/grant${data.id}`, data.grantEncour);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Grant en cours mise à jour avec succès",
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
