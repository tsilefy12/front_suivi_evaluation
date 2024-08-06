import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { DeadlineItem } from "../deadline.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateDeadline = createAsyncThunk(
  "deadline/updateDeadline",
  async (data: { id: string; deadline: DeadlineItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/suivi-evaluation/deadline/${data.id}`,
        data.deadline
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Deadline mise à jour avec succès",
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
