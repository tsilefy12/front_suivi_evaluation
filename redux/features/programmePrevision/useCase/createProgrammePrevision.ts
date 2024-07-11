import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ProgrammePrevisionItem } from "../programmePrevision.interface";

export const createProgrammePrevision = createAsyncThunk(
  "programmePrevision/createProgrammePrevision",
  async (programmePrevision: ProgrammePrevisionItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/programme-prevision",
        programmePrevision
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Programme de prévision créé avec succès",
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
