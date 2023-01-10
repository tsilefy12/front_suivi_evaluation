export function defaultLabelDisplayedRows({ from, to, count }: any) {
  return `${from}–${to} sur ${count !== -1 ? count : `plus que ${to}`}`;
}

export type Order = "asc" | "desc";

export const labelRowsPerPage = "Ligne(s) par page";

export const selectedItemsLabel = "séléctionné(s)";


// Sort table
export function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Sort table based on order (ascending or descending)
export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
