import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'grants',
      numeric: false,
      disablePadding: true,
      label: 'GRANTS',
    },
    {
      id: 'periode',
      numeric: true,
      disablePadding: false,
      label: 'PERIODE',
    },
    {
      id: 'debut',
      numeric: true,
      disablePadding: false,
      label: 'DEBUT',
    },
    {
      id: 'fin',
      numeric: true,
      disablePadding: false,
      label: 'FIN',
    },
  ];

  export const rows = [
    createData('XXX-AAA-0D0', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D1', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D2', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D3', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D4', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D5', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D6', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D7', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D8', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
    createData('XXX-AAA-0D9', '500$', 'dd/mm/yyyy', 'dd/mm/yyyy'),
  ]