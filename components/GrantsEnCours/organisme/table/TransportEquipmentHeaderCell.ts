import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: 'grants',
    numeric: false,
    disablePadding: true,
    label: 'GRANTS',
  },
  {
    id: 'bailleur',
    numeric: true,
    disablePadding: false,
    label: 'VALIDATEUR TECHNIQUE',
  },
  {
    id: 'anglais',
    numeric: true,
    disablePadding: false,
    label: 'FINANCE VALIDATEUR',
  },
  {
    id: 'francais',
    numeric: true,
    disablePadding: false,
    label: 'FINANCE VERIFICATEUR'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'STATUS',
  },
];
