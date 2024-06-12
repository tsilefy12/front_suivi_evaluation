import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteUncompleteTbb = createAsyncThunk(
  "mission/deleteUncompleteTbb",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `suivi-evaluation/uncomplete-tbb/${data.id}`
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Uncomplete dashboard mission supprimée avec succès",
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
