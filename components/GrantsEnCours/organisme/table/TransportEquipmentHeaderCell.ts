import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: "grants",
    numeric: false,
    disablePadding: true,
    label: "GRANTS",
  },
  {
    id: "validateurTech",
    numeric: true,
    disablePadding: false,
    label: "VALIDATEUR TECHNIQUE",
  },
  {
    id: "anglais",
    numeric: true,
    disablePadding: false,
    label: "VALIDATEUR FINANCE",
  },
  {
    id: "francais",
    numeric: true,
    disablePadding: false,
    label: "VERIF. FINANCE",
  },
  {
    id: "bailleur",
    numeric: true,
    disablePadding: false,
    label: "BAILLEUR",
  },
];
