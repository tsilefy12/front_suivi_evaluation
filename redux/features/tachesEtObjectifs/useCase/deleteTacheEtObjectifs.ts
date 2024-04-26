import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteTacheEtObjectifs = createAsyncThunk(
  "tachEtObjectifs/deleteTacheEtObjectifs",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/tache-cle/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Tache et objectifs supprimée avec succès",
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
