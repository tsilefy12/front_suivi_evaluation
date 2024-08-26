import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { NotifyItem } from "../notify.interface";

export const createNotify = createAsyncThunk(
  "notify/createNotify",
  async (notify: NotifyItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/notify", notify);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
