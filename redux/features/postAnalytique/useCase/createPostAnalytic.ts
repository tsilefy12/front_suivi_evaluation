import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PostAnalytiqueItem } from "../postAnalytique.interface";

export const createPostAnalytic = createAsyncThunk(
  "postAnalytic/createPostAnalytic",
  async (postAnalytic: PostAnalytiqueItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/post-analytic", postAnalytic);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Poste analytique créé avec succès",
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
