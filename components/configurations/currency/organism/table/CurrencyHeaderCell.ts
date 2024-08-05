import { CurrencyHeadCell } from "./HeadCell.interface";

export const currencyheadCells: readonly CurrencyHeadCell[] = [
  {
    id: "iso",
    numeric: false,
    disablePadding: false,
    label: "ISO",
  },
  {
    id: "symbol",
    numeric: false,
    disablePadding: false,
    label: "Symbole",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Nom",
  },
  // {
  //   id: "lastUpdated",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Dernière mise à jour",
  // },
  // {
  //   id: "rate",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Evaluation",
  // },
  {
    id: "decimalPlaces",
    numeric: false,
    disablePadding: false,
    label: "Nombre de chiffre aprés virgule",
  },
  {
    id: "symbolPosition",
    numeric: false,
    disablePadding: false,
    label: "Position du signe",
  },
  {
    id: "thousandSeparator",
    numeric: false,
    disablePadding: false,
    label: "Séparateur de Millier",
  },
];
