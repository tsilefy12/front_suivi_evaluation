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
    id: "verificateurFinance",
    numeric: true,
    disablePadding: false,
    label: "VÉRIFICATEUR FINANCIER",
  },
  {
    id: "validateurFinance",
    numeric: true,
    disablePadding: false,
    label: "VALIDATEUR FINANCIER",
  },
  {
    id: "bailleur",
    numeric: true,
    disablePadding: false,
    label: "BAILLEUR",
  },
];
