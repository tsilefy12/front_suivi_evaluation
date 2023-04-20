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
    {
      id: 'anglais',
      numeric: true,
      disablePadding: false,
      label: 'TITRE DU PROJET(Anglais)',
    },
    {
      id: 'francais',
      numeric: true,
      disablePadding: false,
      label: 'TITRE DU PROJET(Français)',
    },
    {
      id: 'responsable',
      numeric: true,
      disablePadding: false,
      label: 'Responsable',
    },
  ];

  export const rows = [
    createData('XXX-AAA-0D0', 'Lorem', 'project title', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D1', 'Lorem', 'project title2', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D2', 'Lorem', 'project title3', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D3', 'Lorem', 'project title4', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D4', 'Lorem', 'project title5', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D5', 'Lorem', 'project title6', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D6', 'Lorem', 'project title7', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D7', 'Lorem', 'project title8', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D8', 'Lorem', 'project title9', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D9', 'Lorem', 'project title10', 'titre du projet', 'Antsa Fitia'),
  ]