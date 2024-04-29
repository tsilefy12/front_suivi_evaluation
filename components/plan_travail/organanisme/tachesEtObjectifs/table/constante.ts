import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "sn",
    numeric: false,
    disablePadding: true,
    label: "S/N",
  },
  {
    id: "keyTasks",
    numeric: true,
    disablePadding: false,
    label: "Tâche Clé",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "Date de début",
  },
  {
    id: "endDate",
    numeric: true,
    disablePadding: false,
    label: "Date fin",
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
