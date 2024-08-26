import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteNotify = createAsyncThunk(
  "notify/deleteNotify",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/suivi-evaluation/notify/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Notification supprimée avec succès",
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
