import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { TachCleItem } from "../tacheCle.interface";

export const createTacheCle = createAsyncThunk(
  "tacheCle/createTacheCle",
  async (createTacheCle: TachCleItem, thunkAPI) => {
    try {
      const response = await axios.post("", createTacheCle);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Key task created successfully",
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
