import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'pj',
      numeric: false,
      disablePadding: true,
      label: 'PJ#',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
      },
      {
        id: 'libelles',
        numeric: true,
        disablePadding: false,
        label: 'Libelles',
      }
  ];

  export const rows = [
    createData('10', '08/10/2021', 'Sac'),
    createData('10', '08/10/2021', 'Provision'),
    createData('10', '08/10/2021', 'Provision'),
    createData('10', '08/10/2021', 'Provision'),
    createData('10', '08/10/2021', 'Provision'),
  ]