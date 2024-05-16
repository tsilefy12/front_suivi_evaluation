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
      label: 'Grants',
    },
    {
      id: 'lb',
      numeric: true,
      disablePadding: false,
      label: 'Ligne budgetaire',
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
    createData('01/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('02/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('03/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('04/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('05/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('06/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('07/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('08/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('09/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
    createData('10/MM/YYYY', 'XXX-AAA-OOO', 'Nom ligne Budgétaire', 'test', '600$'),
  ]