import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ResumeDepensePrevueItem } from "../reumeDepensePrevue.interface";
/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateResumeDepensePrevue = createAsyncThunk(
  "resumeDepensePrevue/updateResumeDepensePrevue",
  async (data: { id: string; resumeDepensePrevue: ResumeDepensePrevueItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/resume-depense/${data.id}`, data.resumeDepensePrevue);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Resumé de depense prevue mise à jour avec succès",
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
