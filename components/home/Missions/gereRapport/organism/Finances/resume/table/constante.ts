import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'grant',
      numeric: false,
      disablePadding: true,
      label: 'Grant',
    },
    {
      id: 'budget',
      numeric: true,
      disablePadding: false,
      label: 'Ligne budgetaire',
    },
    {
      id: 'prevues',
      numeric: true,
      disablePadding: false,
      label: 'Depenses prevues',
    },
    {
      id: 'realisees',
      numeric: true,
      disablePadding: false,
      label: 'Depense realisees',
    },
    {
      id: 'difference',
      numeric: true,
      disablePadding: false,
      label: 'Difference',
    },
    {
      id: 'remarque',
      numeric: true,
      disablePadding: false,
      label: 'Remarques',
    },
  ];

  export const rows = [
    createData('ADN-MOT-001', 'LB1', '100000', '100000', '100000','test'),
    createData('Gasik\'Ar', 'LB1', '100000', '100000', '100000','test'),
  ]