import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteDeadline = createAsyncThunk(
  "deadline/deleteDeadline",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/suivi-evaluation/deadline/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Deadline supprimée avec succès",
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
