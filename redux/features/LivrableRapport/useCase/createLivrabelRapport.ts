import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "../../notification/notificationSlice";
import { axios } from "../../../../axios";
import { LivrableRapportItem } from "../livrableRapport.interface";

// Action creator
export const createLivrableRapport = createAsyncThunk(
  "livrableRapport/createLivrableRapport",
  async (data: LivrableRapportItem, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/suivi-evaluation/livrable-rapport", data);
      dispatch(enqueueSnackbar({
        message: "Livrable rapport créé avec succès",
        options: { variant: "success" },
      }));
      return response.data; // Retourner uniquement les données de la réponse Axios
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Retourner uniquement les données de l'erreur Axios
      }
      return rejectWithValue(error.message); // Retourner un message d'erreur générique
    }
  }
);
