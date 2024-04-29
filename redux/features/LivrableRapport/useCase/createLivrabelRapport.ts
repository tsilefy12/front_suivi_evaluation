import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { LivrableRapportItem } from "../livrableRapport.interface";

export const createLivrableRapport = createAsyncThunk(
  "livrableRapport/createLivrableRapport",
  async (data: {livrableRapport: LivrableRapportItem}, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/livrable-rapport", data.livrableRapport);
      console.log("data :", response.data)
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Deliverable created successfully",
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
