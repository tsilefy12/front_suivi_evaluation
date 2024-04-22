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
    id: "projet",
    numeric: true,
    disablePadding: false,
    label: "Projet",
  },
  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
];

export const rows = [
  createData(
    "1.1 Promouvoir le respect des normes et faire le suivi des filieres deja identifiees",
    "FITANTANANA MAHARITRA HOLOVAIN-JAFY",
    "Allie Mac"
  ),
  createData(
    "1.2 Mener des etudes de faisabilite pour les filieres potentielles",
    "PERMETTRE AUX JEUNES DE MENER LA CONSERVATION DANS LEST DE MADAGASCAR",
    "Allie Mac"
  ),
  createData(
    "1.3 Augmenter la capacite de gestion administrative et financiere des communautes locales",
    "DEVELOPPEMENT, VALORISATION ET AMELIORATION DES CONDITIONS DE VIE DES COMMUNAUTES LOCALES",
    "Antsa Fitia"
  )

];
