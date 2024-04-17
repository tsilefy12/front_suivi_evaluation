import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { PrevisionDepenseItem } from "../previsionDepense.interface";

export const createPrevisionDepense = createAsyncThunk(
  "previsionDepense/createPrevisionDepense",
  async (previsionDepense: PrevisionDepenseItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/prevision-depense", previsionDepense);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Prévision de depense created successfully",
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
