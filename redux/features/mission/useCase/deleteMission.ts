import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

/**
 * delete a mission
 * @param data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to delete a mission
 */
export const deleteMission = createAsyncThunk(
  "mission/deleteMission",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/mission/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Mission supprimée avec succès",
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
