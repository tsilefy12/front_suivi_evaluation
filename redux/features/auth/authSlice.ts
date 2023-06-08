import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../../axios";
import { AuthInitialState } from "./authSlice.interface";

const initialState: AuthInitialState = {
  isLogedIn: false,
  user: null,
  linkedEmployee: null,
};

export const relogedConnectedUser = createAsyncThunk(
  "auth/relodConnectedUser",
  async (data, thunkAPI) => {
    try {
      await thunkAPI.dispatch(fetchConnectedUser()).unwrap();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * Fetch the connected user and set it to the state
 */
export const fetchConnectedUser = createAsyncThunk(
  "auth/getConnectedUser",
  async (data, thunkAPI) => {
    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("at")}`;
      const response = await axios.get("/auth/connected-user");
      // fetch linked employee if exist
      if (response.data.employeeId) {
        await thunkAPI.dispatch(
          fetchLinkedEmployee({ employeeId: response.data.employeeId })
        );
      }
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Fetch linked employee and set it to the state
 */
export const fetchLinkedEmployee = createAsyncThunk(
  "auth/getLinkedEmployee",
  async (data: { employeeId: string }, thunkAPI) => {
    try {
      const response = await axios.get(`/rh/employee/${data.employeeId}`);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Log an user with email and password
 */
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/auth/local/login", data);
      localStorage.setItem("at", response.data.access_token);
      try {
        await thunkAPI.dispatch(fetchConnectedUser()).unwrap();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      thunkAPI.dispatch(logout({}));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLogedIn = false;
      state.user = null;
      localStorage.removeItem("at");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.isLogedIn = true;
    },
    [login.rejected.type]: (state, action) => {
      state.isLogedIn = false;
    },
    [fetchConnectedUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
    },
    [fetchConnectedUser.rejected.type]: (state, action) => {
      state.user = null;
    },
    [relogedConnectedUser.fulfilled.type]: (state, action) => {
      state.isLogedIn = true;
    },
    [fetchLinkedEmployee.fulfilled.type]: (state, action) => {
      // console.log("linked emp : ", action.payload);
      state.linkedEmployee = action.payload;
    },
    [fetchLinkedEmployee.rejected.type]: (state, action) => {
      state.linkedEmployee = null;
    },
  },
});

export const { logout } = authSlice.actions;
