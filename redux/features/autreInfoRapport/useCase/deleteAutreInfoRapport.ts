import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteAutreInfoRapport = createAsyncThunk(
  "autreInfoRapport/deleteAutreInfoRapport",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/autre-info-rapport/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Autre information de rapport supprimé avec succès",
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
