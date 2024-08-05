import { Order } from "../../../../../config/table.config";
import { CurrencyItem } from "../../../../../redux/features/currency/currencySlice.interface";


export interface CurrencyHeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface CurrencyTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CurrencyItem
  ) => void;
  order: Order;
  orderBy: string;
}
