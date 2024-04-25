import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { OrganisationItem } from "../organisation.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateOrganisation= createAsyncThunk(
  "organisation/updateOrganisation",
  async (data: { id: number; organisation: OrganisationItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/compta/organisation/${data.id}`, data.organisation);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "  mise à jour avec succès",
          options: { variant: "success"},
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
