import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteProgrammeRapport = createAsyncThunk(
  "programmeRapport/deleteProgrammeRapport",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/suivi-evaluation/programme-rapport/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Programme de rapport supprimé avec succès",
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
