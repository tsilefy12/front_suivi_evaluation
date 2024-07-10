import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "dd",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "grants",
    numeric: false,
    disablePadding: true,
    label: "Grants",
  },
  {
    id: "caisse",
    numeric: true,
    disablePadding: false,
    label: "Solde caisse",
  },
  {
    id: "banque",
    numeric: true,
    disablePadding: false,
    label: "Solde banque",
  },
  {
    id: "montant",
    numeric: true,
    disablePadding: false,
    label: "Montant total",
  },
];

export const rows = [createData("", "XXX-AAA-0D0", "500$", "100£", "600$")];
