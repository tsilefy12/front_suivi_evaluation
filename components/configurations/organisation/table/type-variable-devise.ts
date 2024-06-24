

export default interface DataDevise {
  devise: string;
  abreviation: string;
}

export type Order = "asc" | "desc";

export interface HeadCellDevise {
  disablePadding: boolean;
  id: keyof DataDevise;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  filtre: any;
  setFiltre : any;
}


export interface EnhancedTablePropsDevise {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof DataDevise
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
