import { createAsyncThunk } from "@reduxjs/toolkit";
import { MissionItem } from "../mission.interface";
import { getEmployeeMM } from "./getEmployeeMM";
import { getEmployeeBM } from "./getEmployeeBM";
import { axios } from "../../../../axios";

/**
 * @param data: { args?: any } : PRISMA arguments to filter getted training data
 * @param thunkAPI
 * @returns {Promise<void>}
 * @description : This function is used to get all training data
 */
export const getMissionListe = createAsyncThunk(
  "mission/getMissionListe",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = JSON.stringify(data.args);
      const response = await axios.get("/mission", {
        params: { args: params },
      });
      let newData: any = [];
      if (response.data.length > 0) {
        await Promise.all(
          response.data.map(async (cons: MissionItem) => {
            const employeeMMId = cons.missionManagerId;
            const detailEmployeeMM = await thunkAPI
              .dispatch(getEmployeeMM({ employeeMMId }))
              .unwrap();
            const employeeBMId = cons.budgetManagerId;
            const detailEmployeeBM = await thunkAPI
              .dispatch(getEmployeeBM({ employeeBMId }))
              .unwrap();
            const oneCons = {
              id: cons.id,
              descriptionMission: cons.descriptionMission,
              missionManagerId: cons.missionManagerId,
              missionManager: detailEmployeeMM,
              budgetManagerId: cons.missionManagerId,
              budgetManager: detailEmployeeBM,
            };
            newData.push(oneCons);
          })
        );
        return newData;
      } else {
        return response.data;
      }
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);
