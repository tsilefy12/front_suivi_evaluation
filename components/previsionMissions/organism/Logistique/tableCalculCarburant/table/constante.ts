import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "trajet",
    numeric: false,
    disablePadding: true,
    label: "Trajet",
  },
  {
    id: "véhicule",
    numeric: true,
    disablePadding: false,
    label: "Véhicule",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type du carburant",
  },
  {
    id: "distance",
    numeric: true,
    disablePadding: false,
    label: "Distance",
  },
  {
    id: "nb",
    numeric: true,
    disablePadding: false,
    label: "Nb trajet",
  },
  {
    id: "distanceTotal",
    numeric: true,
    disablePadding: false,
    label: "Distance total",
  },
  {
    id: "consommationKilo",
    numeric: true,
    disablePadding: false,
    label: "Consommation/100km",
  },
  {
    id: "totalCarburant",
    numeric: true,
    disablePadding: false,
    label: "Total carburant",
  },
];

export const rows = [
  createData(
    "Antananarivo - Diego",
    "1010 TAB",
    "Essence",
    "1000km",
    "Antananarivo - Diego",
    "1000km",
    "1000km",
    "1000km"
  ),
];
