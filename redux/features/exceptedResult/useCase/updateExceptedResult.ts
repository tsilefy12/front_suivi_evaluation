import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axios } from "../../../../lib/axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ExceptedResultItem } from "../exceptedResultSlice.interface";
import { axios } from "../../../../axios";

export const updateExceptedResult = createAsyncThunk(
  "exceptedResult/updateExceptedResult",
  async (
    data: { id: string; exceptedResult: ExceptedResultItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `/excepted-result/${data.id}`,
        data.exceptedResult
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Resultat mis à jour avec succès",
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
