import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: true,
    label: 'CODE',
  },
  {
    id: 'grant',
    numeric: true,
    disablePadding: false,
    label: 'GRANT',
  },
];
