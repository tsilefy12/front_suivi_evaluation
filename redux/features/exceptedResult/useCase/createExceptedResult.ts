import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
// import { FournisseurItem } from "../missionGoalSlice.interface";
import { axios } from "../../../../axios";
import { ExceptedResultItem } from "../exceptedResultSlice.interface";

export const createExceptedResult = createAsyncThunk(
  "ExceptedResult/createExceptedResult",
  async (data: ExceptedResultItem, thunkAPI) => {
    try {
      const response = await axios.post("/excepted-result", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Résultat créé avec succès",
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
