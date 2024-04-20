export interface BudgetInitialItem {
    id?: string;
    grant?: number;
    ligneBudgetaire?: number;
    periode?: string;
    montant?: number;
}
export interface BugdgetInitialInitialState {
    budgetInitialList: BudgetInitialItem[];
    budgetInitial: BudgetInitialItem;
    isEditing: boolean;
    loading: boolean;
    [key: string]: any;
}
