import { createAsyncThunk } from "@reduxjs/toolkit";
import { MissionItem } from "../mission.interface";
import { getEmployeeMM } from "./getEmployeeMM";
import { getEmployeeBM } from "./getEmployeeBM";
import { axios } from "../../../../axios";

export const getMissionListe = createAsyncThunk(
  "mission/getMissionListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/mission", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
