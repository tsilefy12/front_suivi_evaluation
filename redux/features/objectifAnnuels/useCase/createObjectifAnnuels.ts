import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ObjectifAnnuelItem } from "../objectifAnnuel.interface";

export const createObejectifAnnuel = createAsyncThunk(
  "objectifAnnuel/createObejectifAnnuel",
  async (objectifGeneral: ObjectifAnnuelItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/objectif-general", objectifGeneral);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif annuel created successfully",
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
