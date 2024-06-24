import { Order } from "../../../../../config/table.config";
import { LineBudgetItem } from "../../../../../redux/features/lineBudget/lineBudget.interface";

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
    property: keyof LineBudgetItem
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
