import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteType = createAsyncThunk(
  "type/deleteType",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/type-budget/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type supprimé avec succès",
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
