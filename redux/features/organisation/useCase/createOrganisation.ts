import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { OrganisationItem } from "../organisation.interface";

export const createOrganisation = createAsyncThunk(
  "organisation/createOrganisation",
  async (organisation: OrganisationItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/organisation", organisation);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Organisation créer avec succès",
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
