import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { UnCompleteTbbItem } from "../unCompleteTbb.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateUncompleteTbb = createAsyncThunk(
  "mission/updateUncompleteTbb",
  async (data: { id: string; uncompleteTbb: UnCompleteTbbItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/mission/${data.id}`,
        data.uncompleteTbb
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Uncomplete dashboard mise à jour avec succès",
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
