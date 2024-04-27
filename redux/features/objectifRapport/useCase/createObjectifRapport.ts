import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ObjectifRapportItem } from "../objectifRapport.interface";

export const createObjectifRapport = createAsyncThunk(
  "objectifRapport/createObjectifRapport",
  async (objectifRapport: ObjectifRapportItem, thunkAPI) => {
    try {
        const response = await axios.post("/suivi-evaluation/objectifs", objectifRapport);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Objectif created successfully",
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
