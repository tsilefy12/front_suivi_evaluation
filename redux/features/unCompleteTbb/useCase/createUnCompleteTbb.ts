import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { UnCompleteTbbItem } from "../unCompleteTbb.interface";

export const createUnCompleteTbb = createAsyncThunk(
  "mission/createUnCompleteTbb",
  async (unCompleteTbb: UnCompleteTbbItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "suivi-evaluation/uncomplete-tbb",
        unCompleteTbb
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Uncomplete dashboard mission créé avec succès",
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
