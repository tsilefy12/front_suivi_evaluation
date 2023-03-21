import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "dpj",
    numeric: false,
    disablePadding: true,
    label: "DPJ#",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "libelles",
    numeric: true,
    disablePadding: false,
    label: "Libellés",
  },
  {
    id: "montant",
    numeric: true,
    disablePadding: false,
    label: "Montant",
  },
];

export const rows = [
  createData("10", "08/10/2021", "Sac", "10000"),
  createData("10", "08/10/2021", "Sac", "30000"),
  createData("10", "08/10/2021", "Provision", "10000"),
  createData("10", "08/10/2021", "Sac", "30000"),
  createData("10", "08/10/2021", "Provision", "30000"),
];
