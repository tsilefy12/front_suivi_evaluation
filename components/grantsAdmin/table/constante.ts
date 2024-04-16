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
      id: 'bailleur',
      numeric: true,
      disablePadding: false,
      label: 'BAILLEUR',
    },
  ];

  export const rows = [
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D1', 'Lorem'),
    createData('XXX-AAA-0D2', 'Lorem'),
    createData('XXX-AAA-0D3', 'Lorem'),
    createData('XXX-AAA-0D4', 'Lorem'),
    createData('XXX-AAA-0D5', 'Lorem'),
    createData('XXX-AAA-0D6', 'Lorem'),
    createData('XXX-AAA-0D7', 'Lorem'),
    createData('XXX-AAA-0D8', 'Lorem'),
    createData('XXX-AAA-0D9', 'Lorem'),
  ]