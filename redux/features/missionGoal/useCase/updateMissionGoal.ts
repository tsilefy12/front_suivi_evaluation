import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { MissionGoalItem } from "../missionGoalSlice.interface";
import { axios } from "../../../../axios";
// import { FournisseurItem } from "../missionGoalSlice.interface";

export const updateMissionGoal = createAsyncThunk(
  "missionGoal/updateMissionGoal",
  async (data: { id: string; missionGoal: MissionGoalItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/mission-goal/${data.id}`,
        data.missionGoal
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif mis à jour avec succès",
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
