import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../../axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted transportationEquipment data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all transportationEquipment data
 */

export const getTransportationEquipments = createAsyncThunk(
  "transportation-equipment/getTransportationEquipments",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/logistique/transportation-equipment", {
        params: { args: params },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
