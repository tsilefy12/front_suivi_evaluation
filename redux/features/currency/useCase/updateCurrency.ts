import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { CurrencyItem } from "../currencySlice.interface";
/**
 * update a currency 
 * @param data : { id: string, currency: CurrencyItem } : the id of the currency to update and the currency data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @memberof useCases
 * @description : This function is used to update a currency
 */
export const updateCurrency = createAsyncThunk(
	"currency/updateCurrency",
	async (data: { id: string; currency: CurrencyItem }, thunkAPI) => {
		try {
			const response = await axios.patch(
				`/compta/currency/${data.id}`,
				data.currency
			);
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
