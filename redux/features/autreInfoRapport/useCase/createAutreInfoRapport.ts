import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { AutreInfoRapportItem } from "../autreInfoRapport.interface";

export const createAutreInfoRapport = createAsyncThunk(
  "autreInfoRapport/createAutreInfoRapport",
  async (autreInfoRapport: AutreInfoRapportItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/autre-info-rapport", autreInfoRapport);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Other information created successfully",
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
