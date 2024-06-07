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
    id: "deadline",
    numeric: true,
    disablePadding: false,
    label: "Deadline",
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
    id: "dateTech",
    numeric: true,
    disablePadding: false,
    label: "Technical submitted",
  },
  {
    id: "dateFinance",
    numeric: true,
    disablePadding: false,
    label: "Financial submitted",
  },
  {
    id: "technicDelay",
    numeric: true,
    disablePadding: false,
    label: "Technical delay",
  },
  {
    id: "financeDelay",
    numeric: true,
    disablePadding: false,
    label: "Financial delay",
  },
  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
  {
    id: "notes",
    numeric: true,
    disablePadding: false,
    label: "Notes",
  },
  {
    id: "dayLeft",
    numeric: true,
    disablePadding: false,
    label: "Days left",
  },
  {
    id: "annee",
    numeric: true,
    disablePadding: false,
    label: "Year",
  },
];
