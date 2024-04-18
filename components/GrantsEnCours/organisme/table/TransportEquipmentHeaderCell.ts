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
    label: 'BAILLEUR',
  },
  {
    id: 'anglais',
    numeric: true,
    disablePadding: false,
    label: 'TITRE DU PROJET(Anglais)',
  },
  {
    id: 'francais',
    numeric: true,
    disablePadding: false,
    label: 'TITRE DU PROJET(Français)',
  },
  {
    id: 'responsable',
    numeric: true,
    disablePadding: false,
    label: 'Responsable',
  },
];
