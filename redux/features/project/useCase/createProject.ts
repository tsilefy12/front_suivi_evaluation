import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { ProjectItem } from "../project.interface";

export const createProject = createAsyncThunk(
  "project/createProject",
  async (project: ProjectItem, thunkAPI) => {
    try {
      const response = await axios.post("/compta/project", project);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Project créé avec succès",
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
