import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ProgrammeRapportItem } from "../programmeRapport.interface";

export const createProgrammeRapport = createAsyncThunk(
  "programmeRapport/createProgrammeRapport",
  async (programmeRapport: ProgrammeRapportItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/programme-rapport",
        programmeRapport
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Programme de rapport créé avec succès",
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
