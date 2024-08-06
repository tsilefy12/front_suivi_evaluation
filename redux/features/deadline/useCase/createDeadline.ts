import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { DeadlineItem } from "../deadline.interface";

export const createDeadline = createAsyncThunk(
  "deadline/createDeadline",
  async (deadline: DeadlineItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/deadline", deadline);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Deadline créée avec succès",
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
