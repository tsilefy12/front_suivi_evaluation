import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteAutreInfoPrevision = createAsyncThunk(
  "autreInfoPrevision/deleteAutreInfoPrevision",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/autre-info-importante/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Autre information de prévision supprimé avec succès",
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
