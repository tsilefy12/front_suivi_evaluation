import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { StatusItem } from "../status.interface";

export const createStatus = createAsyncThunk(
  "status/createStatus",
  async (statut: StatusItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/status-suivi",
        statut
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Status créé avec succès",
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
