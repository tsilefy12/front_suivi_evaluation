import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../../axios";
import { enqueueSnackbar } from "../notification/notificationSlice";
import {
  EmployeInitialState,
  EmployeItem,
} from "./employeSlice.interface";
import { getEmployeUser } from "./usecase/getEmployeUser";
import { getUsers } from "./usecase/getUsers";

const initialState: EmployeInitialState = {
  employees: [],
  employe: {},
  linkedUser: {},
  isEditing: false,
  loading: false,
  error: null,
  form: {
    users: [],
  },
};

export const getEmploye = createAsyncThunk(
  "employe/getEmploye",
  async (data: {args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get(`/rh/employee`, {
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

export const getEmployes = createAsyncThunk(
  "employe/getEmployes",
  async (data: { args?: any }, thunkAPI) => {
    try {
      const params = {
        args: JSON.stringify(data.args),
      };
      const response = await axios.get("/rh/employee", { params });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const createEmploye = createAsyncThunk(
  "employe/createEmploye",
  async (data: EmployeItem, thunkAPI) => {
    try {
      const response = await axios.post("/rh/employee", data);
      if (data.userId) {
        // update the user
        try {
          const updatedUser = await axios.patch(
            `/auth/user/${data.userId}`,
            {
              data: {
                employeeId: response.data.id,
              },
            }
          );
        } catch (error) {
          console.log(error);
          thunkAPI.dispatch(
            enqueueSnackbar({
              message:
                "Erreur lors de la mise à jour de l'utilisateur",
              options: { variant: "error" },
            })
          );
        }
      }
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Création reussie",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const updateEmploye = createAsyncThunk(
  "employe/updateEmploye",
  async (data: { id: string; employe: EmployeItem }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/rh/employee/${data.id}`,
        data.employe
      );
      if (data.employe.userId) {
        // update the user
        try {
          const updatedUser = await axios.patch(
            `/auth/user/${data.employe.userId}`,
            {
              employeeId: response.data.id,
            }
          );
        } catch (error) {
          console.log(error);
          thunkAPI.dispatch(
            enqueueSnackbar({
              message:
                "Erreur lors de la mise à jour de l'utilisateur",
              options: { variant: "error" },
            })
          );
        }
      }
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Modification reussie",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

export const deleteEmploye = createAsyncThunk(
  "employe/deleteEmploye",
  async (data: { id: string }, thunkAPI) => {
    try {
      const response = await axios.delete(`/rh/employee/${data.id}`);
      thunkAPI.dispatch(
        enqueueSnackbar({
          message: "Suppression reussie",
          options: { variant: "success" },
        })
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

// export const editEmploye = createAsyncThunk(
//   "employe/editEmploye",
//   async (data: { id: string }, thunkAPI) => {
//     try {
//       const employe = await thunkAPI
//         .dispatch(getEmploye({ id: data.id }))
//         .unwrap();
//       return employe;
//     } catch (error: any) {
//       if (error.response) {
//         return thunkAPI.rejectWithValue(error);
//       }
//       throw error;
//     }
//   }
// );

export const employeSlice = createSlice({
  name: "employe",
  initialState: initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.employe = {};
    },
  },
  extraReducers: {
    // get employe
    [getEmploye.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmploye.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    [getEmploye.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get employes
    [getEmployes.pending.type]: (state) => {
      state.loading = true;
    },
    [getEmployes.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },
    [getEmployes.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // create employe
    [createEmploye.pending.type]: (state) => {
      state.loading = true;
    },
    [createEmploye.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employees.push(action.payload);
    },
    [createEmploye.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update employe
    [updateEmploye.pending.type]: (state) => {
      state.loading = true;
    },
    [updateEmploye.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.employe = {};
      state.isEditing = false;
    },
    [updateEmploye.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // delete employe
    [deleteEmploye.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteEmploye.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteEmploye.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // // edit employe
    // [editEmploye.pending.type]: (state) => {
    //   state.loading = true;
    // },
    // [editEmploye.fulfilled.type]: (state, action) => {
    //   state.loading = false;
    //   state.employe = action.payload;
    //   state.isEditing = true;
    // },
    // [editEmploye.rejected.type]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },

    // get users
    [getUsers.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.form!.users = action.payload;
    },
    [getUsers.rejected.type]: (state, action) => {
      state.error = action.error;
    },

    // get linked user
    [getEmployeUser.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getEmployeUser.fulfilled.type]: (state, action) => {
      state.linkedUser = action.payload;
      state.loading = false;
    },
    [getEmployeUser.rejected.type]: (state, action) => {
      state.error = action.error;
    },
  },
});

export const { cancelEdit } = employeSlice.actions;
