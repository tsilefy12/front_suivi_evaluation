import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { ContactItem } from "../contactSlice.interface";
import { axios } from "../../../../axios";

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (data: { id: string; contact: ContactItem }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contact/${data.id}`, data.contact);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Contact mis à jour avec succès",
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
