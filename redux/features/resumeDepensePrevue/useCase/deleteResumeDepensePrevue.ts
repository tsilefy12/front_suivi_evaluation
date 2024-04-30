import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteResumeDepensePrevue = createAsyncThunk(
  "resumeDepensePrevue/deleteResumeDepensePrevue",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/resume-depense-prevue/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Resumé de depnese prevue supprimé avec succès",
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
