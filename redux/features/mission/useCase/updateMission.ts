import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { MissionItem } from "../mission.interface";
import { axios } from "../../../../axios";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateMission = createAsyncThunk(
  "mission/updateMission",
  async (data: { id: string; mission: MissionItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/mission/${data.id}`, data.mission);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mission mise à jour avec succès",
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
