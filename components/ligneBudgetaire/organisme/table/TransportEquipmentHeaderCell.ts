import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "CODE",
  },
  {
    id: "grant",
    numeric: true,
    disablePadding: false,
    label: "GRANT",
  },
  {
    id: "lineBudget",
    numeric: true,
    disablePadding: false,
    label: "LIGNE BUDGET",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "TYPE",
  },
  {
    id: "organisation",
    numeric: true,
    disablePadding: false,
    label: "ORGANISATION",
  },
  {
    id: "montant",
    numeric: true,
    disablePadding: false,
    label: "MONTANT",
  },
];
