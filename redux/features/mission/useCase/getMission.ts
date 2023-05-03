import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeMM } from "./getEmployeeMM";
import { getEmployeeBM } from "./getEmployeeBM";
// import { getEmployee } from "./getEmployee";
import { axios } from "../../../../axios";

/**
 * @param data : { id: string } : the id of the mission get
 * @param thunkAPI
 * @returns {Promise<void>}
 * @constructor
 * @memberof useCases
 * @description : This function is used to get one mission
 */
export const getMission = createAsyncThunk(
  "mission/getMission",
  async (data: { id: string; args?: any }, thunkAPI) => {
    try {
      const response = await axios.get(`/mission/${data.id}`);
      const employeeMMId = response?.data?.missionManagerId;
      const detailEmployeeMM = await thunkAPI
        .dispatch(getEmployeeMM({ employeeMMId }))
        .unwrap();
      const employeeBMId = response?.data?.budgetManagerId;
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
