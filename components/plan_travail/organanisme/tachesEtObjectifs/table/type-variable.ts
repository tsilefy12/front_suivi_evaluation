import { TacheEtObjectifItem } from "../../../../../redux/features/tachesEtObjectifs/tacheETObjectifs.interface";

export default interface Data {
  sn: string;
  keyTasks: string;
  status: string;
  responsable: string;
  startDate: string;
  endDate: string;
}
  

export type Order = 'asc' | 'desc';


export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  selectYear: number;
  setSelectYear : any;
  numSelected: number;
  tacheEtObjectifList : TacheEtObjectifItem[];
}

export interface EnhancedTableProps {
  year : number ;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}