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
        const response = await axios.post("/suivi-evaluation/besoin-en-vehicule", dataBudgetEngaged);
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
        const response = await axios.delete(`/suivi-evaluation/besoin-en-vehicule/${data.id}`);
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
        const response = await axios.get("/suivi-evaluation/besoin-en-vehicule", { params });
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
        const response = await axios.get(`/suivi-evaluation/besoin-en-vehicule/${data.id}`);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error);
        }
        throw error;
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
  
    //   // edit vehicule
    //   [editBesoinVehicule.pending.type]: (state) => {
    //     state.loading = true;
    //   },
    //   [editBesoinVehicule.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.besoinVehicule = action.payload;
    //     state.isEditing = true;
    //   },
    //   [editBesoinVehicule.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
  
    //   // update vehicule 
    //   [updateBesoinVehicule.pending.type]: (state) => {
    //     state.loading = true;
    //   },
    //   [updateBesoinVehicule.fulfilled.type]: (state, action) => {
    //     state.loading = false;
    //     state.besoinVehicule = {};
    //     state.isEditing = false;
    //   },
    //   [updateBesoinVehicule.rejected.type]: (state, action) => {
    //     state.loading = false;
    //     state.error = action.error;
    //   },
  
        // delete vehicule
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