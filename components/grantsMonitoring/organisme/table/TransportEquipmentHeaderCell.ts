import { HeadCell } from "./HeadCell.interface";

export const transportEquipmentHeadCells: readonly HeadCell[] = [
  {
    id: "grants",
    numeric: false,
    disablePadding: true,
    label: "GRANTS",
  },
  {
    id: "projet",
    numeric: true,
    disablePadding: false,
    label: "Projet title",
  },
  {
    id: "dateDebut",
    numeric: true,
    disablePadding: false,
    label: "Periode start",
  },
  {
    id: "dateFin",
    numeric: true,
    disablePadding: false,
    label: "Periode end",
  },

  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
  {
    id: "annee",
    numeric: true,
    disablePadding: false,
    label: "Year",
  },
];
