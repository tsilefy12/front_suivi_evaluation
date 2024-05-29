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
    id: "validateurFinance",
    numeric: true,
    disablePadding: false,
    label: "VALIDATEUR FINANCE",
  },
  {
    id: "verificateurFinance",
    numeric: true,
    disablePadding: false,
    label: "VERIFICATEUR FINANCE",
  },
  {
    id: "bailleur",
    numeric: true,
    disablePadding: false,
    label: "BAILLEUR",
  },
];
