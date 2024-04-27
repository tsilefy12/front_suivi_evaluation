import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { StatusItem } from "../status.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateStatus = createAsyncThunk(
  "status/updateStatus",
  async (data: { id: string; statut: StatusItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/status-suivi/${data.id}`, data.statut);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Status mise à jour avec succès",
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
