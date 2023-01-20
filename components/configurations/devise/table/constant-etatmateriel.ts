import { CreateDevise } from "./function-devise";
import { HeadCellDevise } from "./type-variable-devise";

export const headCellsDevise: readonly HeadCellDevise[] = [
  {
    id: "devise",
    numeric: false,
    disablePadding: true,
    label: "Devise",
  },
  {
    id: "abreviation",
    numeric: false,
    disablePadding: true,
    label: "Abréviation",
  },
];

export const rowssmie = [
  CreateDevise("Dollar Americain", "USD"),
  CreateDevise("Euro", "EUR"),
  CreateDevise("Ariary", "Ar"),
  CreateDevise("livre sterling", "GBP"),
  CreateDevise("Yen", "Yen"),
  CreateDevise("Dollar Americain", "USD"),
  CreateDevise("Euro", "EUR"),
  CreateDevise("Ariary", "Ar"),
  CreateDevise("livre sterling", "GBP"),
  CreateDevise("Yen", "Yen"),
  CreateDevise("Dollar Americain", "USD"),
  CreateDevise("Euro", "EUR"),
  CreateDevise("Ariary", "Ar"),
  CreateDevise("livre sterling", "GBP"),
  CreateDevise("Yen", "Yen"),
];
