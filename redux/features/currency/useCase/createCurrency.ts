import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { CurrencyItem } from "../currencySlice.interface";

/**
 * create a new currency
 * @param CurrencyItem
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCase
 * @description :this function is used to create a new currency
 */

export const createCurrency = createAsyncThunk(
  "currency/createCurrency",
  async (currency: CurrencyItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/currency", currency);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Devise created successfully",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return;
    }
  }
);
