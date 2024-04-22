import { Order } from "../../../../config/table.config";
import { BudgetLineItem } from "../../../../redux/features/budgetLine/budgetLine.interface";

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
    property: keyof BudgetLineItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
