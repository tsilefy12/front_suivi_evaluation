import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ContactItem } from "../contactSlice.interface";

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data: ContactItem, thunkAPI) => {
    try {
      const response = await axios.post("/contact", data);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Contact créé avec succès",
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
