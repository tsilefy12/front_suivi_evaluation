import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'description',
      numeric: false,
      disablePadding: true,
      label: 'DESCRIPTION',
    },
    {
      id: 'periode1',
      numeric: true,
      disablePadding: false,
      label: 'PERIODE 1',
    },
    {
      id: 'periode2',
      numeric: true,
      disablePadding: false,
      label: 'PERIODE 2',
    },
    {
      id: 'total',
      numeric: true,
      disablePadding: false,
      label: 'TOTAL',
    },
  ];

  export const rows = [
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
    createData('Description', '1000', '1000', '2000'),
  ]