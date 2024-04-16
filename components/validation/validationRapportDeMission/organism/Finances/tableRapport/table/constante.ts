import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "rapport",
    numeric: false,
    disablePadding: true,
    label: "Rapport",
  },
];

export const rows = [createData("Rapport 1 "), createData("rapport 2")];
