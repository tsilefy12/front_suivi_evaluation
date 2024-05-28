import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "grants",
    numeric: false,
    disablePadding: true,
    label: "GRANTS",
  },
  {
    id: "projetTitle",
    numeric: true,
    disablePadding: false,
    label: "TITRE PROJET",
  },
];

export const rows = [createData("XXX-AAA-0D0", "Lorem")];
