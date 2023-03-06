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
      id: 'caisse',
      numeric: true,
      disablePadding: false,
      label: 'Solde Caisse',
    },
    {
      id: 'banque',
      numeric: true,
      disablePadding: false,
      label: 'Solde Banque',
    },
    {
      id: 'montant',
      numeric: true,
      disablePadding: false,
      label: 'Montant Total',
    },
  ];

  export const rows = [
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
    createData('XXX-AAA-0D0', '500$', '100£', '600$'),
  ]