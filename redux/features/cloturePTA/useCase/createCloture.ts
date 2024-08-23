import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CloturePTAItem } from "../cloturePTA.interface";

export const createCloture = createAsyncThunk(
  "cloturePTA/createCloture",
  async (cloture: CloturePTAItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/cloture-pta", cloture);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Plan de travail est clôturé",
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

