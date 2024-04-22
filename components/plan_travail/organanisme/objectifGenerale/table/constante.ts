import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "titre",
    numeric: false,
    disablePadding: true,
    label: "TITRE",
  },
  {
    id: "planTravail",
    numeric: false,
    disablePadding: true,
    label: "PLAN DE TRAVAIL",
  },
];

export const rows = [
  createData(
    "1.1 Promouvoir le respect des normes et faire le suivi des filieres deja identifiees",
    "plan"
  ),
];
