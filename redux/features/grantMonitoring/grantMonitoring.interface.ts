import { BudgetInitialItem } from "../budgetInitial/budgetInitial.interface";

export interface GrantMonitoringItem {
  id?: string;
  ligneBudgetaire?: number;
  montant?: number;
  budgetInitialId?: string;
  budgetInitials?: BudgetInitialItem[];
}
export interface GrantMonitoringInitialState {
  grantMonitoringlist: GrantMonitoringItem[];
  grantMonitoring: GrantMonitoringItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
