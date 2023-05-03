import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { MissionItem } from "../mission.interface";
import { axios } from "../../../../axios";

/**
 * Create a new mission
 * @param missionItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to create a new mission
 */
export const createMission = createAsyncThunk(
  "mission/createMssion",
  async (mission: MissionItem, thunkAPI) => {
    try {
      const response = await axios.post("/mission", mission);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mission created successfully",
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
