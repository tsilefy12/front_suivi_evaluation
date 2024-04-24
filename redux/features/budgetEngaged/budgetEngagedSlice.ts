import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BudgetEngagedInitialState, BudgetEngagedItem } from "./budgetEngaged.interface";
import { axios } from "../../../axios";
import { enqueueSnackbar } from "../notification/notificationSlice";

const budgetEngagedInitialState: BudgetEngagedInitialState = {
    budgetEngagedList: [],
    budgetEngaged: {},
    isEditing: false,
    loading: false,
    error: null,
};

export const createBudgetEngaged = createAsyncThunk(
    "budgetEngaget/createBudgetEngaged",
    async (dataBudgetEngaged: BudgetEngagedItem, thunkAPI) => {
      try {
        const response = await axios.post("/suivi-evaluation/budget-engage", dataBudgetEngaged);
        thunkAPI.dispatch(
            enqueueSnackbar({
                message: "Budget engagé créer avec succes",
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

export const deleteBudgetEngaged = createAsyncThunk(
    "budgetEngaged/deleteBudgetEngaged",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.delete(`/suivi-evaluation/budget-engage/${data.id}`);
        thunkAPI.dispatch(
          enqueueSnackbar({
            message: "Budget engagé supprimé avec succès",
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

export const getBudgetEngagedList = createAsyncThunk(
    "budgetEngaged/getBudgetEngagedList",
    async (data: { args?: any }, thunkAPI) => {
      try {
        const params = JSON.stringify(data.args);
        const response = await axios.get("/suivi-evaluation/budget-engage", { params });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);

export const editBudgedEngaged = createAsyncThunk(
    "budgetEngaged/editBudgedEngaged",
    async (data: { id: string }, thunkAPI) => {
      try {
        const response = await axios.get(`/suivi-evaluation/budget-engage/${data.id}`);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);
  
export const getBudgetEngaged = createAsyncThunk(
    "budgetEngaged/getBudgetEngaged",
    async (data: { id: string; args?: any }, thunkAPI) => {
      try {
        const response = await axios.get(`/suivi-evaluation/budget-engage/${data.id}`);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
      }
    }
);

export const updateBudgetEngaged = createAsyncThunk(
    "budgetEngage/updateBudgetEngaged",
    async (data: { id: string; budgetEngageData: BudgetEngagedItem }, thunkAPI) => {
      try {
        const response = await axios.patch(`/suivi-evaluation/budget-engage/${data.id}`, data.budgetEngageData);
        thunkAPI.dispatch(
            enqueueSnackbar({
                message: "mise à jour avec succès",
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

export const budgetEngagedSlice = createSlice({
    name: "budgetEngaged",
    initialState: budgetEngagedInitialState,
    reducers: {
      cancelEdit: (state) => {
        state.isEditing = false;
        state.budgetEngaged = {};
      },
    },
    extraReducers: {
        // get budget engaged
        [getBudgetEngaged.pending.type]: (state) => {
            state.loading = true;
        },
        [getBudgetEngaged.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.budgetEngaged = action.payload;
        },
        [getBudgetEngaged.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // get  budget engaged list
        [getBudgetEngagedList.pending.type]: (state) => {
            state.loading = true;
        },
        [getBudgetEngagedList.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.budgetEngagedList = action.payload;
        },
        [getBudgetEngagedList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // create budget engaged
        [createBudgetEngaged.pending.type]: (state) => {
            state.loading = true;
        },
        [createBudgetEngaged.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.budgetEngagedList.push(action.payload);
        },
        [createBudgetEngaged.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // edit budget engaged
        [editBudgedEngaged.pending.type]: (state) => {
            state.loading = true;
        },
        [editBudgedEngaged.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.budgetEngaged = action.payload;
            state.isEditing = true;
        },
        [editBudgedEngaged.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // update vehicule 
        [updateBudgetEngaged.pending.type]: (state) => {
            state.loading = true;
        },
        [updateBudgetEngaged.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.budgetEngaged = {};
            state.isEditing = false;
        },
        [updateBudgetEngaged.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        // delete budget angaged
        [deleteBudgetEngaged.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteBudgetEngaged.fulfilled.type]: (state, action) => {
            state.loading = false;
        },
        [deleteBudgetEngaged.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
    }
});
  
export const { cancelEdit } = budgetEngagedSlice.actions;