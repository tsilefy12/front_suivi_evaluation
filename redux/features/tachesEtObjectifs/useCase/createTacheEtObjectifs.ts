import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { TacheEtObjectifItem } from "../tacheETObjectifs.interface";

export const createTacheEtObjectifs = createAsyncThunk(
  "tacheEtObjectifs/createTacheEtObjectifs",
  async (tacheEtObjectifs: TacheEtObjectifItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/tache-cle", tacheEtObjectifs);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "created successfully",
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
