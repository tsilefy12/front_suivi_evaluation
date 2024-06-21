import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
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

export const rows = [
  createData("XXX-AAA-0D0", "500$", "100£", "600$"),
  createData("XXX-AAA-0D1", "500$", "100£", "600$"),
  createData("XXX-AAA-0D2", "500$", "100£", "600$"),
  createData("XXX-AAA-0D3", "500$", "100£", "600$"),
  createData("XXX-AAA-0D4", "500$", "100£", "600$"),
  createData("XXX-AAA-0D5", "500$", "100£", "600$"),
  createData("XXX-AAA-0D6", "500$", "100£", "600$"),
  createData("XXX-AAA-0D7", "500$", "100£", "600$"),
  createData("XXX-AAA-0D8", "500$", "100£", "600$"),
  createData("XXX-AAA-0D9", "500$", "100£", "600$"),
];
