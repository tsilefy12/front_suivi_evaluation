import { PeriodeItem } from "../periode/periode.interface";

export interface BudgetInitialItem {
  id?: string;
  grant?: number;
  ligneBudgetaire?: any[];
  periodeId?: string;
  montant?: any;
  periodes?: PeriodeItem[];
}
export interface BugdgetInitialInitialState {
  budgetInitialList: BudgetInitialItem[];
  budgetInitial: BudgetInitialItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
