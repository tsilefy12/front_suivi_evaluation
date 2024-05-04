import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { SiteItem } from "../site.interface";

export const createSite = createAsyncThunk(
  "site/createSite",
  async (site: SiteItem, thunkAPI) => {
    try {
      const response = await axios.post("/suivi-evaluation/site", site);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Site created successfully",
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
