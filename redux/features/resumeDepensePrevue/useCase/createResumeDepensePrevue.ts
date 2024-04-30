import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ResumeDepensePrevueItem } from "../reumeDepensePrevue.interface";

export const createResumeDepensePrevue = createAsyncThunk(
  "resumeDepensePrevue/createResumeDepensePrevue",
  async (resumeDepensePrevue: ResumeDepensePrevueItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/resume-depense-prevue", resumeDepensePrevue);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Resumé de depense prevue created successfully",
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
