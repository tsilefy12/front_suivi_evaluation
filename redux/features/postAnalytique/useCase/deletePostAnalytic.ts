import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deletePostAnalytic = createAsyncThunk(
  "postAnalytique/deletePostAnalytic",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/post-analytic/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Poste supprimé avec succès",
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
