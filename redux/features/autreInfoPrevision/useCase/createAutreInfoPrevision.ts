import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { AutreInfoPrevisionItem } from "../autreInfoPrevision.interface";

export const createAutreInfoPrevision = createAsyncThunk(
  "autreInfoPrevision/createAutreInfoPrevision",
  async (autreInfoPrevision: AutreInfoPrevisionItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/autre-info-importante", autreInfoPrevision);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Autre information de prévision created successfully",
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
