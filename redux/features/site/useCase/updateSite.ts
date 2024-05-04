import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { SiteItem } from "../site.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateSite = createAsyncThunk(
  "site/updateSite",
  async (data: { id: string; site: SiteItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/suivi-evaluation/site/${data.id}`, data.site);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Site mise à jour avec succès",
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
