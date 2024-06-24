import { Order } from "../../../../config/table.config";
import { GrantEncoursItem } from "../../../../redux/features/grantEncours/grantEncours.interface";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface TimesheetEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof GrantEncoursItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  filtre: any;
  setFiltre : any;
}
