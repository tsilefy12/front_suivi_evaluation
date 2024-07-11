import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ActiviteRapportItem } from "../activiteRapport.interface";

export const createActiviteRapport = createAsyncThunk(
  "activite/createActiviteRapport",
  async (activiteRapport: ActiviteRapportItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/activites",
        activiteRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Activity créé avec succès",
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
