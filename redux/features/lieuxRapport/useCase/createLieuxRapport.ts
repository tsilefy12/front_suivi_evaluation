import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { LieuxRapportItem } from "../lieuxRapport.interface";

export const createLieuxRapport = createAsyncThunk(
  "lieux/createLieuxRapport",
  async (data: LieuxRapportItem, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post("/suivi-evaluation/lieux-rapport", data);
       dispatch(
        enqueueSnackbar({
          message: "Lieu de rapport créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error);
      }
      throw error;
    }
  }
);
