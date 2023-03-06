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
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
    createData('XXX-AAA-0D0', 'Lorem'),
  ]