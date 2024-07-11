import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ResumeDepenseItem } from "../reumeDepense.interface";

export const createResumeDepense = createAsyncThunk(
  "resumeDepense/createResumeDepense",
  async (resumeDepense: ResumeDepenseItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/resume-depense",
        resumeDepense
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Resumé de depense créé avec succès",
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
