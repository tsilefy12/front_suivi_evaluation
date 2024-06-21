import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "libellés",
    numeric: true,
    disablePadding: false,
    label: "Libellés",
  },
  {
    id: "n",
    numeric: true,
    disablePadding: false,
    label: "Nombre",
  },
  {
    id: "pu",
    numeric: true,
    disablePadding: false,
    label: "Prix unitaire",
  },
  {
    id: "montant",
    numeric: true,
    disablePadding: false,
    label: "Montant",
  },
  {
    id: "grant",
    numeric: true,
    disablePadding: false,
    label: "Grant",
  },
  {
    id: "ligne",
    numeric: true,
    disablePadding: false,
    label: "Ligne budgetaire",
  },
];

export const rows = [
  createData("08/10/2021", "Sac", "10", "10000", "10000", "ADM-MOT-001", "LB1"),
];
