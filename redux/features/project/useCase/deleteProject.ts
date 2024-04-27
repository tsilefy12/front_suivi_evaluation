import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";

export const deleteProject = createAsyncThunk(
  "preject/deleteProject",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/compta/project/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Projet supprimé avec succès",
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
