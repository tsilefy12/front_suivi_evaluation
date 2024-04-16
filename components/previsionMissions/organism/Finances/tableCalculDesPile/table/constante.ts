import { createData } from "./function";
import { HeadCell } from "./type-variable";

export const headCells: readonly HeadCell[] = [
  {
    id: "appareil",
    numeric: false,
    disablePadding: true,
    label: "Appareil",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "nbapp",
    numeric: true,
    disablePadding: false,
    label: "Nb app",
  },
  {
    id: "nbpile",
    numeric: true,
    disablePadding: false,
    label: "Nb Piles",
  },
  {
    id: "changes",
    numeric: true,
    disablePadding: false,
    label: "Changes",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "nbpacks",
    numeric: true,
    disablePadding: false,
    label: "Nb Packs",
  },
];

export const rows = [
  createData("Torche", "type appareil", "10", "2", "5", "100000", "1"),
  createData("Megaphone", "type appareil", "20", "2", "10", "200000", "2"),
];
