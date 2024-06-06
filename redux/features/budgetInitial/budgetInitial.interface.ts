import { GrantMonitoringItem } from "../grantMonitoring/grantMonitoring.interface";
import { PeriodeItem } from "../periode/periode.interface";

export interface BudgetInitialItem {
  id?: string;
  grant?: number;
  periodeId?: string;
  periodes?: PeriodeItem[];
  grantsMonitorings?: GrantMonitoringItem[];
}
export interface BugdgetInitialInitialState {
  budgetInitialList: BudgetInitialItem[];
  budgetInitial: BudgetInitialItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
