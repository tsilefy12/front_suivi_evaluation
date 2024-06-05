import { PeriodeItem } from "../periode/periode.interface";

export interface BudgetInitialItem {
  id?: string;
  grant?: number;
  ligneBudgetaire?: {}[];
  periodeId?: string;
  montant?: any | null;
  periodes?: PeriodeItem[];
}
export interface BugdgetInitialInitialState {
  budgetInitialList: BudgetInitialItem[];
  budgetInitial: BudgetInitialItem;
  isEditing: boolean;
  loading: boolean;
  [key: string]: any;
}
