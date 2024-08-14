import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../../axios";

export interface FileInitialState {
  files: FileItem[];
  file: FileItem;
  isEditing: boolean;
  loading: boolean;
  error: any;
  [key: string]: any;
}

export interface FileItem {
  id?: string;
  file?: any;
  [key: string]: any;
  active?: boolean;
}

const initialState: FileInitialState = {
  files: [],
  file: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const getFile = createAsyncThunk(
  "file/getFile",
  async (data: { profileImageUrl: any; args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`${data.profileImageUrl}`, {
        params,
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

export const createFile = createAsyncThunk(
  "file/createFile",
  async (data: FileItem, thunkAPI) => {
    try {
      const response = await axios.post("/file/upload", data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.file = {};
    },
  },
  extraReducers: {
    [getFile.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getFile.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.file = action.payload;
    },
    [getFile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createFile.pending.type]: (state, action) => {
      state.loading = true;
    },
    [createFile.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [createFile.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { cancelEdit } = fileSlice.actions;
