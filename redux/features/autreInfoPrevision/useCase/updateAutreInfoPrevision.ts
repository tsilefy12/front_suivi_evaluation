import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { AutreInfoPrevisionItem } from "../autreInfoPrevision.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateAutreInfoPrevision = createAsyncThunk(
  "autreInfoPrevision/updateAutreInfoPrevision",
  async (data: { id: string; autreInfoPrevision: AutreInfoPrevisionItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/autre-info-importante/${data.id}`, data.autreInfoPrevision);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Autre information de prévision mise à jour avec succès",
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
