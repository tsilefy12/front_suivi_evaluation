import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "tache",
    numeric: false,
    disablePadding: true,
    label: "Tâche Clé",
  },
  {
    id: "projetEn",
    numeric: true,
    disablePadding: false,
    label: "Titre projet en Anglais",
  },
  {
    id: "projetFr",
    numeric: true,
    disablePadding: false,
    label: "Titre projet en Français",
  },
  {
    id: "plan",
    numeric: true,
    disablePadding: false,
    label: "Plan du travail",
  },
];

export const rows = [
  createData(
    "1.1 Promouvoir le respect des normes et faire le suivi des filieres deja identifiees",
    "FITANTANANA MAHARITRA HOLOVAIN-JAFY",
    "FITANTANANA MAHARITRA HOLOVAIN-JAFY",
    "FITANTANANA MAHARITRA HOLOVAIN-JAFY",
  ),

];
