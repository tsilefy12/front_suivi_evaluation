import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";
import { enqueueSnackbar } from "../../notification/notificationSlice";
/**
 * update a currency
 * @param data : { id: string, currency: CurrencyItem } : the id of the currency to update and the currency data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a currency
 */
export const updateCurrencyDefault = createAsyncThunk(
  "currency/updateCurrencyDefault",
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/compta/currency/${data.id}/default`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Devise updated successfully",
          options: { variant: "success" },
        })
      );
      console.log(data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      return error;
    }
  }
);
