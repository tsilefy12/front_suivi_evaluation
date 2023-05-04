import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
// import { FournisseurItem } from "../missionGoalSlice.interface";
import { axios } from "../../../../axios";
import { MissionGoalItem } from "../missionGoalSlice.interface";

export const createMissionGoal = createAsyncThunk(
  "missionGoal/createMissionGoal",
  async (data: MissionGoalItem, thunkAPI) => {
    try {
      const response = await axios.post("/mission-goal", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
