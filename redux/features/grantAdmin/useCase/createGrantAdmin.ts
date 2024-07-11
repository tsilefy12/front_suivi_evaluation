import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { GrantAdminItem } from "../grantAdmin.interface";

export const createGrantAdmin = createAsyncThunk(
  "grantAdmin/createGrantAdmin",
  async (grantAdmin: GrantAdminItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/grant-admin",
        grantAdmin
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Grant admin créé avec succès",
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
