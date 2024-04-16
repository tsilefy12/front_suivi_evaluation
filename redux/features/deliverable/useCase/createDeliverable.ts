import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { DeliverableItem } from "../deliverableSlice.interface";

export const createDeliverable = createAsyncThunk(
  "deliverable/createDeliverable",
  async (data: DeliverableItem, thunkAPI) => {
    try {
      const response = await axios.post("/deliverable", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Livrable créé avec succès",
          options: {
            variant: "success",
          },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
