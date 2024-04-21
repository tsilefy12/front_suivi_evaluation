import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'grant',
      numeric: false,
      disablePadding: true,
      label: 'GRANT',
    },
    {
      id: 'ligneBudgetaire',
      numeric: true,
      disablePadding: false,
      label: 'LIGNE BUDGETAIRE',
    },
    {
      id: 'periode',
      numeric: true,
      disablePadding: false,
      label: 'PERIODE',
    },
    {
      id: 'montant',
      numeric: true,
      disablePadding: false,
      label: 'MONTANT',
    },
    // {
    //   id: 'total',
    //   numeric: true,
    //   disablePadding: false,
    //   label: 'TOTAL',
    // },
  ];

  export const rows = [
    createData('Description1', '1000', '1000', '1000'),
  ]