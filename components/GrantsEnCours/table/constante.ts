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
    createData('XXX-AAA-0D0', 'Lorem', 'project title2', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title3', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title4', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title5', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title6', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title7', 'titre du projet', 'allie Mac'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title8', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title9', 'titre du projet', 'Antsa Fitia'),
    createData('XXX-AAA-0D0', 'Lorem', 'project title10', 'titre du projet', 'Antsa Fitia'),
  ]