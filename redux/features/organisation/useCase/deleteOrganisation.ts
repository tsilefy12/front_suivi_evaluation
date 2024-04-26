import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteOrganisation = createAsyncThunk(
  "organisation/deleteOrganisation",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/config-organisation/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Organisation supprimé avec succès",
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
