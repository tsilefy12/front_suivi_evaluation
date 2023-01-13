import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'Date',
    },
    {
      id: 'grants',
      numeric: true,
      disablePadding: false,
      label: 'GRANTS',
    },
    {
      id: 'lb',
      numeric: true,
      disablePadding: false,
      label: 'LB',
    },
    {
      id: 'libelle',
      numeric: true,
      disablePadding: false,
      label: 'Libellé',
    },
    {
      id: 'montant',
      numeric: true,
      disablePadding: false,
      label: 'Montant',
    },
  ];

  export const rows = [
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('DD/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
  ]