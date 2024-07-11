import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ReliquatGrantsItem } from "../reliquatGrants.interface";

export const createReliquatGrant = createAsyncThunk(
  "reliquatGrant/createReliquatGrant",
  async (reliquatGrant: ReliquatGrantsItem, thunkAPI) => {
    try {
      const response = await axios.post(
        "/suivi-evaluation/reliquat-grant",
        reliquatGrant
      );
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Reliquate grants créé avec succès",
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
