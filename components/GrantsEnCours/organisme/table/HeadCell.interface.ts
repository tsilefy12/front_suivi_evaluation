import { Order } from "../../../../config/table.config";
import { TransportationEquipmentItem } from "../../../../redux/features/transportation_equipment/transportationEquipment.interface";

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
    property: keyof TransportationEquipmentItem
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
