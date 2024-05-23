import { PeriodeItem } from "../periode/periode.interface";

export interface BudgetInitialItem {
  id?: string;
  grant?: number;
  ligneBudgetaire?: number[];
  periodeId?: string;
  montant?: number;
  periodes?: PeriodeItem[];
}
export interface BugdgetInitialInitialState {
  budgetInitialList: BudgetInitialItem[];
  budgetInitial: BudgetInitialItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
