import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { TypeItem } from "../type.interface";

export const createType = createAsyncThunk(

  "type/createType",
  async (type: TypeItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/type-budget", type);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Type créer avec succès",
          options: { variant: "success" }
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
