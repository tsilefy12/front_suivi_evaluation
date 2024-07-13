import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ProgrammeRapportItem } from "../programmeRapport.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateProgrammeRapport = createAsyncThunk(
  "programmeRapport/updateProgrammeRapport",
  async (
    data: { id: string; programmeRapport: ProgrammeRapportItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `suivi-evaluation/programme-rapport/${data.id}`,
        data.programmeRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Programme de rapport mise à jour avec succès",
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
