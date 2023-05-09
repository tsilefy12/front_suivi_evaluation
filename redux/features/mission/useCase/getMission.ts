import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeMM } from "./getEmployeeMM";
import { getEmployeeBM } from "./getEmployeeBM";
import { axios } from "../../../../axios";

export const getMission = createAsyncThunk(
  "mission/getMission",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/mission/${data.id}`);

      const employeeMMId = response?.data?.missionManagerId;
      const employeeBMId = response?.data?.budgetManagerId;
      const detailEmployeeMM = await thunkAPI
        .dispatch(getEmployeeMM({ employeeMMId }))
        .unwrap();
      const detailEmployeeBM = await thunkAPI
        .dispatch(getEmployeeBM({ employeeBMId }))
        .unwrap();
      const oneCons = {
        id: response.data?.id,
        descriptionMission: response.data?.descriptionMission,
        missionManagerId: response.data?.missionManagerId,
        budgetManagerId: response.data?.budgetManagerId,
        missionManager: detailEmployeeMM,
        budgerManager: detailEmployeeBM,
      };
      return oneCons;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
