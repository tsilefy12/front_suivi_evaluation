import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { GrantEncoursItem } from "../grantEncours.interface";

export const createGrantEncours = createAsyncThunk(
  "grantEncours/createMssion",
  async (grantEncours: GrantEncoursItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/grant", grantEncours);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Grant en cours créé avec succès",
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
