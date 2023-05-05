import { createSlice } from "@reduxjs/toolkit";
import { createContact } from "./useCase/createContact";
import { editContact } from "./useCase/editContact";
import { getContact } from "./useCase/getContact";
import { getContactList } from "./useCase/getContactListe";
import { updateContact } from "./useCase/updateContact";
import { ContactInitialState } from "./contactSlice.interface";
import { deleteContact } from "./useCase/deleteContact";

const initialState: ContactInitialState = {
  contactList: [],
  contact: {},
  isEditing: false,
  loading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    cancelEdit: (state) => {
      state.isEditing = false;
      state.contact = {};
    },
  },
  extraReducers: {
    [getContact.pending.type]: (state) => {
      state.loading = true;
    },
    [getContact.fulfilled.type]: (state, action) => {
      state.contact = action.payload;
      state.loading = false;
    },
    [getContact.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [getContactList.pending.type]: (state) => {
      state.loading = true;
    },
    [getContactList.fulfilled.type]: (state, action) => {
      state.contactList = action.payload;
      state.loading = false;
    },
    [getContactList.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [createContact.pending.type]: (state) => {
      state.loading = true;
    },
    [createContact.fulfilled.type]: (state, action) => {
      state.loading = false;
      // state.vehicleList.push(action.payload);
    },
    [createContact.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [updateContact.pending.type]: (state) => {
      state.loading = true;
    },
    [updateContact.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.isEditing = false;
      state.contact = {};
    },
    [updateContact.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [deleteContact.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteContact.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [deleteContact.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },

    [editContact.pending.type]: (state) => {
      state.loading = true;
    },
    [editContact.fulfilled.type]: (state, action) => {
      state.contact = action.payload;
      state.loading = false;
      state.isEditing = true;
    },
    [editContact.rejected.type]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { cancelEdit } = contactSlice.actions;
