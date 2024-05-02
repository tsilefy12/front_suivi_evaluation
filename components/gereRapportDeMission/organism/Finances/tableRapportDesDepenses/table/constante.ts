import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "dpj",
    numeric: false,
    disablePadding: true,
    label: "DPJ#",
  },
  // {
  //   id: "date",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Date",
  // },
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
  {
    id: "grant",
    numeric: true,
    disablePadding: false,
    label: "Grant",
  },
  {
    id: "budgetLine",
    numeric: true,
    disablePadding: false,
    label: "Budget line",
  },
];

export const rows = [
  createData("10", "08/10/2021", "Sac", "10000","Sac", "10000"),
];
