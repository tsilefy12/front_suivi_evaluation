import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: "code",
    numeric: false,
    disablePadding: true,
    label: "LIGNE BUDGETAIRE",
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
    label: "GRANT LINE 2",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "GRANT LINE 1",
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
