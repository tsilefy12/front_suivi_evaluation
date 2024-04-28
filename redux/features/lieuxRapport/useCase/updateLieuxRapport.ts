import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { LieuxRapportItem } from "../lieuxRapport.interface";
import { axios } from "../../../../axios";

export const updateLieuxRapport = createAsyncThunk(
  "lieux/updateLieuxRapport",
  async (data: { id: string; lieuxRapport: LieuxRapportItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/suivi-evaluation/lieux-rapport/${data.id}`,
        data.lieuxRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Lieu mis à jour avec succès",
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
