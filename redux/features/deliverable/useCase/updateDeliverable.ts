import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { DeliverableItem } from "../deliverableSlice.interface";
import { axios } from "../../../../axios";

export const updateDeliverable = createAsyncThunk(
  "deliverable/updateDeliverable",
  async (data: { id: string; deliverable: DeliverableItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/deliverable/${data.id}`,
        data.deliverable
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "livrable mis à jour avec succès",
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
