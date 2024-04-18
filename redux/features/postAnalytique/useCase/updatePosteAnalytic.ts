import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PostAnalytiqueItem } from "../postAnalytique.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updatePostAnalytic = createAsyncThunk(
  "postAnalytic/updatePostAnalytic",
  async (data: { id: string; postAnalytic: PostAnalytiqueItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/compta/post-analytic/${data.id}`, data.postAnalytic);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Poste analytique mise à jour avec succès",
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
