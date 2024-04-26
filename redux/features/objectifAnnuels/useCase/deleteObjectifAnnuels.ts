import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteObjectifAnnuel = createAsyncThunk(
  "objectifAnnuels/deleteObjectifAnnuel",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/objectif-general/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif général supprimée avec succès",
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
