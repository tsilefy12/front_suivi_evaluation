import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { TypeItem } from "../type.interface";

/**
 * update a mission
 * @param data : { id: string, mission: missionItem } : the id of the mission to update and the mission data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a mission
 */
export const updateType= createAsyncThunk(
  "type/updateType",
  async (data: { id: string; type: TypeItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/compta/type-budget/${data.id}`, data.type);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type  mise à jour avec succès",
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
