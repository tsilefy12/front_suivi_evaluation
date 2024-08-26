import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { NotifyItem } from "../notify.interface";

/**
 * update project
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateNotify = createAsyncThunk(
  "notify/updateNotify",
  async (data: { id: string; notify: NotifyItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/suivi-evaluation/notify/${data.id}`,
        data.notify
      );
      // thunkAPI.dispatch(
      //   enqueueSnackbar({
      //     message: "Projet mise à jour avec succès",
      //     options: { variant: "success" },
      //   })
      // );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
