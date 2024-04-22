import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ObjectifGeneralItem } from "../objectifGeneral.interface";

export const createObejectifGeneral = createAsyncThunk(
  "objectifGeneral/createObejectifGeneral",
  async (objectifGeneral: ObjectifGeneralItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/objectif-general", objectifGeneral);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Objectif général created successfully",
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
