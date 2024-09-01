import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "grant",
    numeric: false,
    disablePadding: true,
    label: "Grant",
  },
  {
    id: "ligne",
    numeric: true,
    disablePadding: false,
    label: "Ligne budgetaire",
  },
  {
    id: "depenses",
    numeric: true,
    disablePadding: false,
    label: "Dépenses prévues",
  },
  {
    id: "remarques",
    numeric: true,
    disablePadding: false,
    label: "Remarques",
  },
];

export const rows = [
  createData("ADM-MOT-001", "LB1", "100000", "100000"),
  createData("Gasik'Ar", "LB2", "200000", "200000"),
];
