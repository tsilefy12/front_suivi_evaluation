import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "dateDébut",
    numeric: false,
    disablePadding: true,
    label: "Date début",
  },
  {
    id: "dateFin",
    numeric: true,
    disablePadding: false,
    label: "Date fin",
  },
  {
    id: "véhicule",
    numeric: true,
    disablePadding: false,
    label: "Véhicule",
  },
  {
    id: "trajet",
    numeric: true,
    disablePadding: false,
    label: "Trajet",
  },
  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
  {
    id: "nb",
    numeric: true,
    disablePadding: false,
    label: "Nb Jours",
  },
];

export const rows = [
  createData(
    "dd/MM/yyyy",
    "dd/MM/yyyy",
    "1010 TAB",
    "Antananarivo - Diego",
    "Aina",
    "10"
  ),
  createData(
    "dd/MM/yyyy",
    "dd/MM/yyyy",
    "2020 TAB",
    "Antananarivo - Diego",
    "Rakoto",
    "5"
  ),
];
