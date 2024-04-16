import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteGrantEncours = createAsyncThunk(
  "grantEncours/deleteGrantEncours",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "grant en cours supprimé avec succès",
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
