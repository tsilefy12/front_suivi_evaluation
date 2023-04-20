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
    createData('Description1', '1000', '1000', '2000'),
    createData('Description2', '1000', '1000', '2000'),
    createData('Description3', '1000', '1000', '2000'),
    createData('Description4', '1000', '1000', '2000'),
    createData('Description5', '1000', '1000', '2000'),
    createData('Description6', '1000', '1000', '2000'),
    createData('Description7', '1000', '1000', '2000'),
    createData('Description8', '1000', '1000', '2000'),
    createData('Description9', '1000', '1000', '2000'),
    createData('Description0', '1000', '1000', '2000'),
  ]